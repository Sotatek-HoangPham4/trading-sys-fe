"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useChangeEmailMutation,
  useVerifyCurrentEmailMutation,
} from "@/features/user/infrastructure/api/userApi";

type Props = {
  onVerified: () => void;
};

const VerifyCurrentEmailStep: React.FC<Props> = ({ onVerified }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const currentEmail = auth.user?.email;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const [sendCode] = useChangeEmailMutation();
  const [verifyCode] = useVerifyCurrentEmailMutation();

  const handleSendCode = async () => {
    await sendCode({ currentEmail }).unwrap();
  };

  const handleVerify = async () => {
    try {
      await verifyCode({ currentEmail, verificationCode: code }).unwrap();
      onVerified();
    } catch (e: any) {
      setError(e?.data?.message || "Invalid code");
    }
  };

  return (
    <div className="space-y-4">
      <Button className="w-full" onClick={handleSendCode}>
        Send verification code
      </Button>
      <Input
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button className="w-full" onClick={handleVerify}>
        Continue
      </Button>
    </div>
  );
};

export default VerifyCurrentEmailStep;
