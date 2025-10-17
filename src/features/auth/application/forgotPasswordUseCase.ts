import { useForgotPasswordMutation } from "@/features/auth/infrastructure/api/authApi";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const forgotPassword = async (data: { email: string }) => {
    try {
      const response = await forgotPasswordMutation(data).unwrap();
      toast.success("Password reset link sent to your email");
      return response;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send reset link");
      throw error;
    }
  };

  return { forgotPassword, isLoading };
};
