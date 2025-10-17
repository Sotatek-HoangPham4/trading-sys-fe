import { useRegisterMutation } from "@/features/auth/infrastructure/api/authApi";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await registerMutation(data).unwrap();
      toast.success("Your account has been created!");

      return response;
    } catch (error: any) {
      toast.error(error?.data?.message || "Register fail!");
      throw error;
    }
  };

  return { register, isLoading };
};
