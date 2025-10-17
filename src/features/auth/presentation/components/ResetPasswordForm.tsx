"use client";

import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { Button } from "../../../../shared/components/ui/button";
import { Input } from "../../../../shared/components/ui/input";
import { Label } from "../../../../shared/components/ui/label";
import toast from "react-hot-toast";
import Image from "next/image";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useResetPassword } from "@/features/auth/application/resetPasswordUseCase";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const { resetPassword, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await resetPassword({
      token,
      newPassword: data.newPassword,
    });
    setTimeout(() => router.push("/login"), 3000);
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
          <p className="font-semibold text-2xl">Reset your password</p>
          <p className="text-muted-foreground">
            Enter your new password below to complete the reset process.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="grid gap-6">
          {/* New Password */}
          <div className="grid gap-3">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              startIcon={<TbPasswordFingerprint />}
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              startIcon={<TbPasswordFingerprint />}
              placeholder="Confirm your new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
