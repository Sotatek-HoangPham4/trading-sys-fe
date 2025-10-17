"use client";

import { useForm } from "react-hook-form";
import { cn } from "@/shared/lib/utils";

import { Button } from "../../../../shared/components/ui/button";
import { Input } from "../../../../shared/components/ui/input";
import { Label } from "../../../../shared/components/ui/label";
import toast from "react-hot-toast";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useForgotPassword } from "@/features/auth/application/forgotPasswordUseCase";

interface FormData {
  email: string;
}

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { forgotPassword, isLoading } = useForgotPassword();

  const onSubmit = async (data: FormData) => {
    await forgotPassword({ email: data.email });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-6">
        <div className="h-12 w-12 flex items-center justify-center p-2 border rounded-xl">
          <Image
            src="/icons/logo-only.svg"
            alt="logo-only"
            width={36}
            height={36}
            className="hover:scale-110 transition-all duration-150 cursor-pointer"
          />
        </div>
        <div className="text-center">
          <p className="font-semibold text-2xl">Forgot your password?</p>
          <p className="text-muted-foreground">
            Enter your email below and we’ll send you a reset link.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <form
          className={cn("flex flex-col gap-6", className)}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                startIcon={<MdEmail />}
                placeholder="user@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
