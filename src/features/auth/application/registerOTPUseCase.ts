import { useRegisterOTPMutation } from "@/features/auth/infrastructure/api/authApi";
import toast from "react-hot-toast";

export const useRegisterOTP = () => {
  const [registerOTPMutation, { isLoading }] = useRegisterOTPMutation();

  const registerOTP = async (data: { email: string }) => {
    try {
      const response = await registerOTPMutation(data).unwrap();
      toast.success("OTP code has been send to your email!");
      return response;
    } catch (error: any) {
      toast.error(error?.data?.message || "Register fail!");
      throw error;
    }
  };

  return { registerOTP, isLoading };
};
