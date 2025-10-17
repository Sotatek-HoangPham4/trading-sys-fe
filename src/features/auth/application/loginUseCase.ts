"use client";

import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/features/auth/infrastructure/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { mapLoginResponseToAuthState } from "@/core/application/mapper/authMapper";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();

  const login = async (data: { email: string; password: string }) => {
    try {
      const response = await loginMutation(data).unwrap();
      const authState = mapLoginResponseToAuthState(response);
      console.log("authState :", authState);

      // Lưu vào Redux đúng key
      dispatch(
        setCredentials({
          user: authState.user,
          accessToken: authState.accessToken,
        })
      );

      // Lưu refreshToken persist
      localStorage.setItem(
        "refreshToken",
        response.data.tokens?.refreshToken || response.data.refreshToken || ""
      );

      localStorage.setItem(
        "accessToken",
        response.data.tokens?.accessToken || response.data.accessToken || ""
      );

      toast.success("Login successfully!");
      router.push("/home");
      return response;
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed!");
      throw error;
    }
  };

  return { login, isLoading };
};
