"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import {
  useUpdateMeMutation,
  useUpdateUserMutation,
} from "@/features/user/infrastructure/api/userApi";
import { setCredentials, updateUserName } from "@/store/slices/authSlice";
import { Camera } from "lucide-react";

const AccountProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [preferredName, setPreferredName] = useState<string>(
    auth.user?.name || ""
  );
  const [isEditPreferredName, setIsEditPreferredName] =
    useState<boolean>(false);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSave = async () => {
    try {
      if (!auth.user?.id) return;

      const res = await updateUser({
        id: auth.user.id,
        data: { name: preferredName },
      }).unwrap();

      // 🆕 Update Redux store so UI stays in sync
      dispatch(
        setCredentials({
          user: { ...auth.user, name: preferredName },
          accessToken: auth.accessToken,
        })
      );

      toast.success("Updated name successfully!");
      setIsEditPreferredName(false);
    } catch (error: any) {
      console.error("Failed to update user:", error);
      toast.error(error?.data?.message || "Failed to update name");
    }
  };

  return (
    <div>
      <div className="text-sm font-medium text-muted-foreground">
        <p className="text-base">Account</p>
      </div>
      <hr className="my-4" />
      <div className="space-y-2">
        <div className="flex items-start gap-4">
          <div>
            <div className="space-y-2 relative">
              <img
                src={auth.user?.avatar || "/default-avatar.png"}
                className="rounded-full w-20 h-20 object-cover hover:opacity-50"
                alt="avatar"
              />
              <div className="w-20 h-20 rounded-full bg-muted/70 transition-all duration-300 cursor-pointer hover:opacity-100 opacity-0 border absolute top-0 z-10 flex items-center justify-center">
                <Camera size={24} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Preferred name</p>
            <div className="flex items-center gap-2">
              <Input
                className="h-9 w-64 rounded-md"
                value={preferredName}
                onChange={(e) => {
                  setPreferredName(e.target.value);
                  setIsEditPreferredName(true);
                }}
              />
              {isEditPreferredName && (
                <Button
                  size={"md"}
                  onClick={handleSave}
                  disabled={isLoading || preferredName.trim() === ""}
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* <div className="flex items-center">
          <Button className="text-xs px-1" variant={"link"} size={"sm"}>
            Add photo
          </Button>
          <p className="text-xs">or</p>
          <Button className="text-xs px-1" variant={"link"} size={"sm"}>
            Upload photo
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default AccountProfile;
