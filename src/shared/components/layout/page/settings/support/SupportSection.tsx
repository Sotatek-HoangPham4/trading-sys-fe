import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { RootState } from "@/store";
import { ChevronRight, Trash, Trash2 } from "lucide-react";
import React from "react";
import { GoPasskeyFill } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { useSelector } from "react-redux";

const SupportSection = () => {
  const userData = useSelector((state: RootState) => state.auth);
  return (
    <div className="">
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Support</p>
      </div>

      <div className="space-y-4 mt-4 border-y-1 py-4">
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Support access</p>
            <p className="text-[13px] text-muted-foreground max-w-4/5">
              Grant Notion support temporary access to your account so we can
              troubleshoot problems or recover content on your behalf. You can
              revoke access at any time.
            </p>
          </div>
          <Switch />
        </div>
        <Dialog>
          <DialogTrigger className="w-full justify-start text-left cursor-pointer">
            <div className="w-full flex items-center justify-between gap-24">
              <div className="space-y-1">
                <p className="font-medium text-destructive">
                  Delete my account
                </p>
                <p className="text-[13px] text-muted-foreground">
                  Permanently delete the account and remove access from all
                  workspaces.
                </p>
              </div>
              <Button size={"icon"} variant={"ghost"}>
                <ChevronRight className="ml-0.5" />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="sm:max-w-sm">
            <div className="flex flex-col items-center text-center gap-2 py-2">
              <div className="rounded-full relative">
                <Trash2 size={32} className="text-destructive ml-2.5" />

                <div className="absolute rounded-full -bottom-2.5 -right-2.5 w-fit">
                  <img
                    src={userData.user?.avatar!}
                    className="rounded-full w-6 h-6 border-2 border-white"
                    alt=""
                  />
                </div>
              </div>
              <p className="text-base font-semibold mt-4">
                Delete your entire account permanently?
              </p>
              <p className="text-muted-foreground px-1">
                This action cannot be undone. Your entire account will be
                permanently deleted and you will be removed from all shared
                workspaces. Additionally, the following workspace you own will
                be permanently deleted, removing any other members and their
                access:
              </p>
            </div>
            <div className="space-y-2">
              <p>Please type in your email to confirm.</p>
              <Input
                // value={confirmNewPassword!}
                // onChange={(e) => {
                //   setConfirmNewPassword(e.target.value);
                // }}
                placeholder={userData.user?.email!}
                type="password"
                className="h-9 rounded-md placeholder:tracking-normal tracking-[0.1rem]"
              />
            </div>

            <div className="space-y-2">
              <Button
                // onClick={() => {
                //   setIsSetPassword(true);
                //   setPasswordDialog(false);
                // }}
                variant={"destructive"}
                size={"md"}
                className="w-full"
              >
                <p>Permanently delete my account</p>
              </Button>
              <Button
                // onClick={() => {
                //   setIsSetPassword(true);
                //   setPasswordDialog(false);
                // }}
                variant={"ghost"}
                size={"md"}
                className="w-full"
              >
                <p className="text-muted-foreground">Cancel</p>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SupportSection;
