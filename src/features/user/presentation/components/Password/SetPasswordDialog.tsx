"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { RectangleEllipsis, X } from "lucide-react";

interface SetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newPassword: string;
  confirmNewPassword: string;
  setNewPassword: (v: string) => void;
  setConfirmNewPassword: (v: string) => void;
  onSetPassword: () => void;
}

export const SetPasswordDialog = ({
  open,
  onOpenChange,
  newPassword,
  confirmNewPassword,
  setNewPassword,
  setConfirmNewPassword,
  onSetPassword,
}: SetPasswordDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button variant="outline" size="sm" onClick={() => onOpenChange(true)}>
          Set a password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center text-center space-y-3">
          <RectangleEllipsis size={32} />
          <p className="text-base font-semibold">Set a password</p>
          <p className="text-muted-foreground px-1">
            Use a password at least 15 letters long, or at least 8 characters
            long with both letters and numbers.
          </p>
        </div>

        <div className="space-y-2 mt-2">
          <p className="text-xs text-muted-foreground ml-1">
            Enter new password
          </p>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="New password"
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

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground ml-1">Confirm password</p>
          <Input
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            type="password"
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

        <Button className="w-full" onClick={onSetPassword}>
          Set a password
        </Button>
      </DialogContent>
    </Dialog>
  );
};
