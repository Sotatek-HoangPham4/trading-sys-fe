"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SuccessDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm text-center flex flex-col items-center gap-2 py-2">
        <Check size={32} />
        <p className="text-base font-semibold mt-4">
          Your email has been changed
        </p>
        <p className="text-muted-foreground">
          We’ll ask for this email when you log in to your account.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
