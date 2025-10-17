"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { X } from "lucide-react";
import {
  useVerifyNewEmailMutation,
  useConfirmNewEmailMutation,
} from "@/features/user/infrastructure/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { RootState } from "@/store";

type Props = {
  newEmail: string;
  setNewEmail: (val: string) => void;
  onSuccess: () => void;
};

const VerifyNewEmailStep: React.FC<Props> = ({
  newEmail,
  setNewEmail,
  onSuccess,
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [sendCode] = useVerifyNewEmailMutation();
  const [confirmCode] = useConfirmNewEmailMutation();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSendCode = async () => {
    await sendCode({ newEmail });
    setIsCodeSent(true);
  };

  const handleConfirm = async () => {
    try {
      await confirmCode({ newEmail, verificationCode: code }).unwrap();
      dispatch(
        setCredentials({
          user: { ...auth.user, email: newEmail },
          accessToken: auth.accessToken,
        })
      );
      onSuccess();
    } catch (e: any) {
      setError(e?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        value={newEmail}
        placeholder="Enter new email"
        onChange={(e) => setNewEmail(e.target.value)}
        endIcon={
          newEmail && (
            <div
              className="w-5 h-5 -mr-0.5 rounded-full bg-muted-foreground/50 flex items-center justify-center"
              onClick={() => setNewEmail("")}
            >
              <X
                size={14}
                strokeWidth={3}
                className="cursor-pointer text-muted"
              />
            </div>
          )
        }
      />

      {isCodeSent && (
        <>
          <Input
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </>
      )}

      <Button
        className="w-full"
        onClick={isCodeSent ? handleConfirm : handleSendCode}
      >
        {isCodeSent ? "Change Email" : "Send verification code"}
      </Button>
    </div>
  );
};

export default VerifyNewEmailStep;
