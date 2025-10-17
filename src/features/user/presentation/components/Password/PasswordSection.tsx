"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePasswordSection } from "../../hooks/usePasswordSection";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { SetPasswordDialog } from "./SetPasswordDialog";

export const PasswordSection = () => {
  const user = useSelector((state: RootState) => state.auth);
  const {
    hasPassword,
    isSetPassword,
    setIsSetPassword,
    passwordDialog,
    setPasswordDialog,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    resetFields,
  } = usePasswordSection();

  const handleSetPassword = () => {
    setIsSetPassword(true);
    setPasswordDialog(false);
    resetFields();
  };

  return (
    <div className="w-full flex items-center justify-between gap-24">
      <div className="space-y-1">
        <p className="font-medium">Password</p>
        <p className="text-[13px] text-muted-foreground">
          Set a permanent password to login to your account.
        </p>
      </div>

      {hasPassword ? (
        <ChangePasswordDialog
          open={passwordDialog}
          onOpenChange={setPasswordDialog}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          onChangePassword={handleSetPassword}
          resetFields={resetFields}
        />
      ) : (
        <SetPasswordDialog
          open={passwordDialog}
          onOpenChange={setPasswordDialog}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          setNewPassword={setNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          onSetPassword={handleSetPassword}
        />
      )}

      <Dialog open={isSetPassword} onOpenChange={setIsSetPassword}>
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <Check size={32} />
            <p className="text-base font-semibold mt-4">
              Your password has been set
            </p>
            <p className="text-muted-foreground">
              We’ll ask for this password when you log in to your account.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
