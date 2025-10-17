import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/features/auth/infrastructure/api/authApi";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();

  const resetPassword = async (data: {
    token: string;
    newPassword: string;
  }) => {
    try {
      const response = await resetPasswordMutation(data).unwrap();
      toast.success("Password reset sucessful");
      return response;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password");
      throw error;
    }
  };

  return { resetPassword, isLoading };
};
