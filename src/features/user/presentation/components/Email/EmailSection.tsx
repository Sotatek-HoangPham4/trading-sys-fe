"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/shared/components/ui/button";
import ChangeEmailDialog from "./ChangeEmailDialog";
import SuccessDialog from "./SuccessDialog";

const EmailSection = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isChangeDialog, setIsChangeDialog] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);

  return (
    <div className="w-full flex items-center justify-between gap-24">
      <div className="space-y-1">
        <p className="font-medium">Email</p>
        <p className="text-[13px] text-muted-foreground">{auth.user?.email}</p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsChangeDialog(true)}
      >
        Change email
      </Button>

      <ChangeEmailDialog
        open={isChangeDialog}
        onOpenChange={setIsChangeDialog}
        onSuccess={() => setIsSuccessDialog(true)}
      />

      <SuccessDialog open={isSuccessDialog} onOpenChange={setIsSuccessDialog} />
    </div>
  );
};

export default EmailSection;
