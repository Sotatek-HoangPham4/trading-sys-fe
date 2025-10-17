import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9000/api/v1";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    registerOTP: builder.mutation<SendOTPResponse, SendOTPRequest>({
      query: (data) => ({
        url: "register/otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyRegisterOTP: builder.mutation<VerifyOTPResponse, VerifyOTPRequest>({
      query: (data) => ({
        url: "register/otp/verify",
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation<ForgotPasswordResponse, any>({
      query: (data) => ({
        url: "password/forgot",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, any>({
      query: (data) => ({
        url: "password/reset",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, any>({
      query: (data) => ({
        url: "token/refresh",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterOTPMutation,
  useVerifyRegisterOTPMutation,
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = authApi;
