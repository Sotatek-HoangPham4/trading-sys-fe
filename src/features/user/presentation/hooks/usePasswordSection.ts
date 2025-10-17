import { useState } from "react";

export function usePasswordSection() {
  const [hasPassword, setHasPassword] = useState<boolean>(true);
  const [isSetPassword, setIsSetPassword] = useState<boolean>(false);
  const [passwordDialog, setPasswordDialog] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const resetFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return {
    hasPassword,
    setHasPassword,
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
  };
}
