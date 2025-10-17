import { Button } from "@/shared/components/ui/button";
import React from "react";

const OnBoardingPage = () => {
  return (
    <div className="">
      <div className="header"></div>
      <div className="mx-auto max-w-md px-5 py-24">
        <div className="mb-12 text-center my-1">
          <p className="text-2xl font-medium">
            Join class or create a workspace
          </p>
          <p className="text-xl font-medium text-muted-foreground/50">
            You’ve been invited to 5+ workspaces
          </p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-xs text-muted-foreground font-semibold">Invites</p>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-full border p-3 rounded-xl flex justify-between bg-muted-foreground/5"
            >
              <div className="flex gap-3">
                <div className="p-1">
                  <div className="h-7 w-7 bg-muted-foreground/10 rounded-sm flex items-center justify-center">
                    <p className="font-semibold">H</p>
                  </div>
                </div>
                <div className="">
                  <p className="text-base font-semibold">Icetea</p>
                  <p className="text-xs text-muted-foreground">
                    78 members • Created by Thi Trà Đá
                  </p>
                  <div className="flex mt-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={
                        "https://lh3.googleusercontent.com/a-/AOh14GiqVFHGF2NbPYcFp4z7uYud-TmA3ZUmm_CUFbnD=s100"
                      }
                    />
                    <img
                      className="h-6 w-6 rounded-full -ml-1.5"
                      src={
                        "https://lh3.googleusercontent.com/a-/AOh14GiqVFHGF2NbPYcFp4z7uYud-TmA3ZUmm_CUFbnD=s100"
                      }
                    />{" "}
                    <img
                      className="h-6 w-6 rounded-full -ml-1.5"
                      src={
                        "https://lh3.googleusercontent.com/a-/AOh14GiqVFHGF2NbPYcFp4z7uYud-TmA3ZUmm_CUFbnD=s100"
                      }
                    />
                  </div>
                </div>
              </div>
              <Button
                className="h-8 px-3 text-blue-500 hover:text-blue-500 dark:hover:bg-blue-800/20"
                variant={"ghost"}
              >
                Join
              </Button>
            </div>
          ))}
          <Button variant={"secondary"}>Create workspace</Button>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
