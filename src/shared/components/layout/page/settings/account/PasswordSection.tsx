import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/shared/components/ui/button";
import { Check, RectangleEllipsis, Eye, EyeOff } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  useChangePasswordMutation,
  useSetPasswordMutation,
} from "@/features/user/infrastructure/api/userApi";
import { setCredentials } from "@/store/slices/authSlice";

const PasswordSection = () => {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  console.log("user", user.user?.isHasPassword);

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [setPassword] = useSetPasswordMutation();

  const [isHasPassword, setIsHasPassword] = useState<boolean>(
    user.user?.isHasPassword as boolean
  );

  useEffect(() => {
    setIsHasPassword(user.user?.isHasPassword as boolean);
  }, [user]);

  const [isSetPassword, setIsSetPassword] = useState<boolean>(false);
  const [passwordDialog, setPasswordDialog] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>("");

  const [changePasswordDialog, setChangePasswordDialog] =
    useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string | null>("");
  const [newPassword, setNewPassword] = useState<string | null>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string | null>(
    ""
  );
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = (field: string) => {
    if (field === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmNewPassword(!showConfirmNewPassword);
    }
  };

  const passwordInputClass =
    "h-9 rounded-md placeholder:tracking-normal tracking-[0.1rem]";

  const handleChangePassword = async () => {
    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
      }).unwrap(); // Assuming `unwrap()` is used to simplify error handling directly in the response

      // Handle successful password change
      // toast.success("Password updated successfully!");
      setIsSetPassword(true);
      setPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      // Log error for debugging
      console.error("Error response:", error);

      // Check for specific error message from the response data
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update password";

      // Show error toast with the error message
      toast.error(errorMessage);
    }
  };

  const handleSetPassword = async () => {
    // ✅ Validate password
    if (!newPassword || newPassword.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // ✅ So sánh newPassword và confirmNewPassword
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      // setIsLoading(true); // (tùy chọn) bật loading khi gọi API
      await setPassword({ password: newPassword }).unwrap();

      setIsSetPassword(true);
      setPasswordDialog(false);

      dispatch(
        setCredentials({
          user: { ...user.user, isHasPassword: true },
          accessToken: user.accessToken,
        })
      );

      // 🧹 Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Failed to update password. Please try again.";

      setPasswordError(errorMessage);
    } finally {
      // setIsLoading(false); // (tùy chọn) tắt loading
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-24">
      <div className="space-y-1">
        <p className="font-medium">Password</p>
        <p className="text-[13px] text-muted-foreground">
          Set a permanent password to login to your account.
        </p>
      </div>

      {isHasPassword ? (
        <Dialog
          open={passwordDialog}
          onOpenChange={(open) => setPasswordDialog(open)}
        >
          <DialogTrigger>
            <Button
              onClick={() => {
                setPasswordDialog(true);
              }}
              variant={"outline"}
              size={"sm"}
            >
              Change password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <div className="flex flex-col items-center text-center space-y-3">
              <RectangleEllipsis size={32} />
              <p className="text-base font-semibold">Change password</p>
              <p className="text-muted-foreground px-1">
                Use a password at least 15 letters long, or at least 8
                characters long with both letters and numbers.
              </p>
            </div>
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
                    <div
                      className="w-5 h-full -mr-0.5 text-muted-foreground/80 cursor-pointer"
                      onClick={() => togglePasswordVisibility("current")}
                    >
                      {showCurrentPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </div>
                  )
                }
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current password"
                className={
                  showCurrentPassword ? "h-9 rounded-md" : passwordInputClass
                }
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground ml-1">
                Enter a new password
              </p>
              <Input
                value={newPassword!}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                endIcon={
                  newPassword && (
                    <div
                      className="w-5 h-full -mr-0.5 text-muted-foreground/80 cursor-pointer"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showNewPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </div>
                  )
                }
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                className={
                  showNewPassword ? "h-9 rounded-md" : passwordInputClass
                }
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground ml-1">
                Confirm your new password
              </p>
              <Input
                value={confirmNewPassword!}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
                placeholder="Confirm password"
                type={showConfirmNewPassword ? "text" : "password"}
                className={
                  showConfirmNewPassword ? "h-9 rounded-md" : passwordInputClass
                }
                endIcon={
                  confirmNewPassword && (
                    <div
                      className="w-5 h-full -mr-0.5 text-muted-foreground/80 cursor-pointer"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showConfirmNewPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </div>
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Button
                // onClick={() => {
                //   // setIsSetPassword(true);
                //   // setPasswordDialog(false);
                //   handleChangePassword;
                // }}
                onClick={handleChangePassword}
                size={"md"}
                className="w-full"
              >
                Change password
              </Button>
              <Button
                onClick={() => {
                  setIsSetPassword(true);
                  setPasswordDialog(false);
                }}
                variant={"ghost"}
                size={"md"}
                className="w-full text-muted-foreground"
              >
                Remove password
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          open={passwordDialog}
          onOpenChange={(open) => setPasswordDialog(open)}
        >
          <DialogTrigger>
            <Button
              onClick={() => {
                setPasswordDialog(true);
              }}
              variant={"outline"}
              size={"sm"}
            >
              Set a password
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <div className="flex flex-col items-center text-center space-y-3">
              <RectangleEllipsis size={32} />
              <p className="text-base font-semibold">Set a password</p>
              <p className="text-muted-foreground px-1">
                Use a password at least 15 letters long, or at least 8
                characters long with both letters and numbers.
              </p>
            </div>
            <div className="space-y-2 mt-2">
              <p className="text-xs text-muted-foreground ml-1">
                Enter a new password
              </p>
              <Input
                value={newPassword!}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError("");
                }}
                endIcon={
                  newPassword && (
                    <div
                      className="w-5 h-full -mr-0.5 text-muted-foreground/80 cursor-pointer"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showNewPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </div>
                  )
                }
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                className={
                  showNewPassword ? "h-9 rounded-md" : passwordInputClass
                }
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground ml-1">
                Confirm your new password
              </p>
              <Input
                value={confirmNewPassword!}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Confirm password"
                type={showConfirmNewPassword ? "text" : "password"}
                className={
                  showConfirmNewPassword ? "h-9 rounded-md" : passwordInputClass
                }
                endIcon={
                  confirmNewPassword && (
                    <div
                      className="w-5 h-full -mr-0.5 text-muted-foreground/80 cursor-pointer"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showConfirmNewPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </div>
                  )
                }
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm font-medium text-center">
                {passwordError}
              </p>
            )}

            <Button onClick={handleSetPassword} size={"md"} className="w-full">
              Set a password
            </Button>
          </DialogContent>
        </Dialog>
      )}

      <Dialog
        open={isSetPassword}
        onOpenChange={(open) => setIsSetPassword(open)}
      >
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

export default PasswordSection;
