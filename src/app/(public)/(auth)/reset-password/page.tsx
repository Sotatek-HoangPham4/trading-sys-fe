import { ResetPasswordForm } from "@/features/auth/presentation/components/ResetPasswordForm";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <div className="relative min-h-svh flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background-auth.webp')",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
