import { useRefreshTokenMutation } from "@/features/auth/infrastructure/api/authApi";
import toast from "react-hot-toast";

export const useRefreshToken = () => {
  const [refreshTokenMutation, { isLoading }] = useRefreshTokenMutation();

  const refreshToken = async (data: { refreshToken: string }) => {
    try {
      const response = await refreshTokenMutation(data).unwrap();
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  return { refreshToken, isLoading };
};
