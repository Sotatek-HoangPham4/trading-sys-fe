import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { KeyRound, ShieldCheck } from "lucide-react";
import React from "react";
import { GoPasskeyFill } from "react-icons/go";
const PasskeysSection = () => {
  return (
    <div className="w-full flex items-center justify-between gap-24">
      <div className="space-y-1">
        <p className="font-medium">Passkeys</p>
        <p className="text-[13px] text-muted-foreground">
          Securely sign-in with on-device biometric authentication.
        </p>
      </div>

      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"} size={"sm"}>
            Add Passkey
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <GoPasskeyFill size={32} className="text-muted-foreground" />
            <p className="text-base font-semibold mt-4">Manage Passkeys</p>
            <p className="text-muted-foreground px-1">
              Use your device's built-in security features like Face ID to sign
              in instead of remembering passwords.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              // onClick={() => {
              //   setIsSetPassword(true);
              //   setPasswordDialog(false);
              // }}

              size={"md"}
              className="w-full"
            >
              <GoPasskeyFill />
              <p>Add new passkey</p>
            </Button>
            <Button
              // onClick={() => {
              //   setIsSetPassword(true);
              //   setPasswordDialog(false);
              // }}
              variant={"outline"}
              size={"md"}
              className="w-full"
            >
              <p className="text-muted-foreground">Cancel</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PasskeysSection;
