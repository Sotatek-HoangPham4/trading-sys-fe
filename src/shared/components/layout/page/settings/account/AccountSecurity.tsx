import React from "react";
import EmailSection from "./EmailSection";
import { Button } from "@/shared/components/ui/button";
import TwoStepVerificationSection from "./TwoStepVerificationSection";
import PasskeysSection from "./PasskeysSection";
import PasswordSection from "./PasswordSection";
// import { PasswordSection } from "@/features/user/presentation/components/Password/PasswordSection";

const AccountSecurity = () => {
  return (
    <div className="">
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Account security</p>
      </div>
      <div className="space-y-4 border-y-1 mt-4 py-4">
        <EmailSection />
        <PasswordSection />
        <TwoStepVerificationSection />
        <PasskeysSection />
      </div>
    </div>
  );
};

export default AccountSecurity;
