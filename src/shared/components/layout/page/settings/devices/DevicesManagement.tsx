import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Laptop } from "lucide-react";
import React from "react";
import { RiUserForbidFill } from "react-icons/ri";
const DevicesManagement = () => {
  return (
    <div className="">
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Devices</p>
      </div>
      <hr className="my-4" />
      <div className="space-y-4">
        <div className="w-full flex items-center justify-between gap-24">
          <div className="space-y-1">
            <p className="font-medium">Log out of all devices</p>

            <p className="text-[13px] text-muted-foreground">
              Log out of all other active sessions on other devices besides this
              one.
            </p>
          </div>

          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"} size={"sm"}>
                Log out of all devices
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-xs">
              <div className="flex flex-col items-center text-center gap-2 py-2">
                <RiUserForbidFill size={32} className="text-muted-foreground" />
                <p className="text-base font-semibold mt-4">
                  Log out of all devices?
                </p>
                <p className="text-muted-foreground px-1">
                  You will be logged out of all other active sessions on other
                  devices except this one.
                </p>
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
                  {/* <GoPasskeyFill /> */}
                  <p>Log out</p>
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
      </div>
      <div className="">
        <div className="border-y-1 py-1 mt-4 flex">
          <div className="w-1/3">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-xs px-1.5 py-0.5 h-6 rounded-sm font-normal text-muted-foreground"
            >
              Device Name
            </Button>
          </div>
          <div className="w-1/4">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-xs px-1.5 py-0.5 h-6 rounded-sm font-normal text-muted-foreground"
            >
              Last Active
            </Button>
          </div>
          <div className="w-1/3">
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-xs px-1.5 py-0.5 h-6 rounded-sm font-normal text-muted-foreground"
            >
              Location
            </Button>
          </div>
          <div className="w-20"></div>
        </div>
        <div className="border-b-1 py-2.5 flex">
          <div className="w-1/3 flex gap-2.5 px-1 items-center">
            <Laptop size={20} className="text-muted-foreground" />
            <div className="space-y-0.5">
              <p className="text-xs">Windows Device</p>
              <p className="text-[10px] text-blue-500">This Device</p>
            </div>
          </div>
          <div className="w-1/4 flex items-center">
            <p className="text-muted-foreground ml-2 text-xs">Now</p>
          </div>
          <div className="w-1/3 flex items-center">
            <p className="text-muted-foreground ml-2 text-xs">
              VN-44, Viet Nam
            </p>
          </div>

          <Dialog>
            <DialogTrigger>
              <div className="w-20">
                <Button
                  className="text-xs h-7 px-2"
                  variant={"outline"}
                  size={"sm"}
                >
                  Log out
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="sm:max-w-xs">
              <div className="flex flex-col items-center text-center gap-2 py-2">
                <RiUserForbidFill size={32} className="text-muted-foreground" />
                <p className="text-base font-semibold mt-4">
                  Log out of all devices?
                </p>
                <p className="text-muted-foreground px-1">
                  You will be logged out of all other active sessions on other
                  devices except this one.
                </p>
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
                  {/* <GoPasskeyFill /> */}
                  <p>Log out</p>
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
        <div className="border-b-1 py-2.5 flex">
          <div className="w-1/3 flex gap-2.5 px-1 items-center">
            <Laptop size={20} className="text-muted-foreground" />
            <div className="space-y-0.5">
              <p className="text-xs">Windows Device</p>
              <p className="text-[10px] text-blue-500">This Device</p>
            </div>
          </div>
          <div className="w-1/4 flex items-center">
            <p className="text-muted-foreground ml-2 text-xs">Now</p>
          </div>
          <div className="w-1/3 flex items-center">
            <p className="text-muted-foreground ml-2 text-xs">
              VN-44, Viet Nam
            </p>
          </div>
          <div className="w-20">
            <Button
              className="text-xs h-7 px-2"
              variant={"outline"}
              size={"sm"}
            >
              Log out
            </Button>
          </div>
        </div>
        <div className="border-b py-2">
          <p className="text-xs text-muted-foreground/50">All device loaded</p>
        </div>
      </div>
    </div>
  );
};

export default DevicesManagement;
