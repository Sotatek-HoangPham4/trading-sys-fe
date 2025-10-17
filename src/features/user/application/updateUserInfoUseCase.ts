import { useVerifyRegisterOTPMutation } from "@/features/auth/infrastructure/api/authApi";
import toast from "react-hot-toast";

export const useVerifyRegisterOTP = () => {
  const [verifyRegisterOTPMutation, { isLoading }] =
    useVerifyRegisterOTPMutation();

  const verifyRegisterOTP = async (data: {
    email: string;
    password: string;
    code: string;
  }) => {
    try {
      const response = await verifyRegisterOTPMutation(data).unwrap();
      toast.success("Your account has been created!");
      return response;
    } catch (error: any) {
      toast.error(error?.data?.message || "Register fail!");
      throw error;
    }
  };

  return { verifyRegisterOTP, isLoading };
};
