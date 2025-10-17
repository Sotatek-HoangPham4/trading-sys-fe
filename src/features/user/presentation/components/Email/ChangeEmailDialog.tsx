"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import VerifyCurrentEmailStep from "./VerifyCurrentEmailStep";
import VerifyNewEmailStep from "./VerifyNewEmailStep";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

const ChangeEmailDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const [step, setStep] = useState<"current" | "new">("current");
  const [newEmail, setNewEmail] = useState<string>("");
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Change your email</DialogTitle>
          <DialogDescription>
            Your current email is{" "}
            <span className="font-semibold text-white">{auth.user?.email}</span>
            . We’ll send a verification code to this email.
          </DialogDescription>
        </DialogHeader>

        {step === "current" ? (
          <VerifyCurrentEmailStep onVerified={() => setStep("new")} />
        ) : (
          <VerifyNewEmailStep
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            onSuccess={() => {
              onOpenChange(false);
              onSuccess();
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailDialog;
