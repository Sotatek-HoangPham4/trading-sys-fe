import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../index";
import { setCredentials, setTokenExpired } from "../slices/authSlice";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check if result is not undefined and result.data exists
  if (result.error) {
    console.error("Error in baseQuery:", result.error);
    return result;
  }

  if (result.data && (result.data as any).status === 401) {
    const refreshToken = (api.getState() as RootState).auth.tokens
      ?.refreshToken;
    console.log("refreshToken:", refreshToken);

    if (!refreshToken) {
      api.dispatch(setTokenExpired(true));
      return result; // Return the error if no refresh token is available
    }

    // Attempt refresh token if available
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST", body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newTokens = (refreshResult.data as any).tokens;
      api.dispatch(
        setCredentials({
          tokens: newTokens,
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
        })
      );

      // Save the new tokens in localStorage
      localStorage.setItem("accessToken", newTokens.accessToken);
      localStorage.setItem("refreshToken", newTokens.refreshToken);

      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setTokenExpired(true));
      return refreshResult; // Return the refreshResult if refresh failed
    }
  }

  return result;
};
