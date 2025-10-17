"use client";

import { useForm } from "react-hook-form";
import { Label } from "../../../../shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useVerifyRegisterOTP } from "@/features/auth/application/verifyRegisterOTPUseCase";
import { useRouter } from "next/navigation";

interface OTPFormProps {
  email: string;
  password: string;
  onVerified?: () => void;
}

interface OtpFormValues {
  code: string;
}

export function OTPForm({ email, password, onVerified }: OTPFormProps) {
  const router = useRouter();
  const { verifyRegisterOTP, isLoading } = useVerifyRegisterOTP();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpFormValues>({
    defaultValues: { code: "" },
  });

  const otpValue = watch("code");

  const onSubmit = async (data: OtpFormValues) => {
    await verifyRegisterOTP({
      email,
      password,
      code: data.code,
    });

    if (onVerified) onVerified();

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-6"
    >
      <p className="text-center ">
        Enter the 6-digit verification code sent to <strong>{email}</strong>
      </p>

      <Label htmlFor="otp">Verification Code</Label>

      <div className="w-full flex flex-col items-center gap-4">
        <InputOTP
          maxLength={6}
          value={otpValue || ""}
          onChange={(value) => setValue("code", value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} /> <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {errors.code && (
          <p className="text-red-500 text-sm">{errors.code.message}</p>
        )}

        <Button className="w-60" type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </form>
  );
}
