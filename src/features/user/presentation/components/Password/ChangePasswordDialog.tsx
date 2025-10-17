"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { RectangleEllipsis, X } from "lucide-react";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  setCurrentPassword: (v: string) => void;
  setNewPassword: (v: string) => void;
  setConfirmNewPassword: (v: string) => void;
  onChangePassword: () => void;
  resetFields: () => void;
}

export const ChangePasswordDialog = ({
  open,
  onOpenChange,
  currentPassword,
  newPassword,
  confirmNewPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmNewPassword,
  onChangePassword,
  resetFields,
}: ChangePasswordDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button variant="outline" size="sm" onClick={() => onOpenChange(true)}>
          Change password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center text-center space-y-3">
          <RectangleEllipsis size={32} />
          <p className="text-base font-semibold">Change password</p>
          <p className="text-muted-foreground px-1">
            Use a password at least 15 letters long, or at least 8 characters
            long with both letters and numbers.
          </p>
        </div>

        {/* Current password */}
        <div className="space-y-2 mt-2">
          <p className="text-xs text-muted-foreground ml-1">
            Enter your current password
          </p>
          <Input
            value={currentPassword!}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            endIcon={
              currentPassword && (
                <div className="w-5 h-5 -mr-0.5 rounded-full bg-muted-foreground/50 flex items-center justify-center">
                  <X
                    size={14}
                    strokeWidth={3}
                    className="cursor-pointer text-muted"
                    onClick={() => {
                      setCurrentPassword("");
                    }}
                  />
                </div>
              )
            }
            type="password"
            placeholder="Current password"
            className="h-9 rounded-md placeholder:tracking-normal tracking-[0.1rem]"
          />
        </div>

        {/* New password */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground ml-1">
            Enter a new password
          </p>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="New password"
            className="h-9 rounded-md placeholder:tracking-normal tracking-[0.1rem]"
            endIcon={
              newPassword && (
                <div
                  className="w-5 h-5 -mr-0.5 rounded-full bg-muted-foreground/50 flex items-center justify-center"
                  onClick={() => setNewPassword("")}
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
        </div>

        {/* Confirm new password */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground ml-1">
            Confirm new password
          </p>
          <Input
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            type="password"
            className="h-9 rounded-md placeholder:tracking-normal tracking-[0.1rem]"
            placeholder="Confirm password"
            endIcon={
              confirmNewPassword && (
                <div
                  className="w-5 h-5 -mr-0.5 rounded-full bg-muted-foreground/50 flex items-center justify-center"
                  onClick={() => setConfirmNewPassword("")}
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
        </div>

        <div className="space-y-2">
          <Button className="w-full" size={"md"} onClick={onChangePassword}>
            Change password
          </Button>
          <Button
            variant="ghost"
            size="md"
            className="w-full text-muted-foreground"
            onClick={onChangePassword}
          >
            Remove password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
