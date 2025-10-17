import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaLock } from "react-icons/fa";
import { Button } from "@/shared/components/ui/button";
import { RootState } from "@/store";
import {
  CircleCheck,
  ClockFading,
  Lock,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/shared/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import {
  useSetup2FAMutation,
  useVerify2FAMutation,
  useVerifyIdentityMutation,
} from "@/features/user/infrastructure/api/userApi";
import toast from "react-hot-toast";
import { setCredentials } from "@/store/slices/authSlice";

const TwoStepVerifySection = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth);
  const [currentPassword, setCurrentPassword] = useState<string | null>("");
  const [isContinueSetUp, setIsContinueSetUp] = useState<boolean>(false);
  const [isContinueScanCode, setIsContinueScanCode] = useState<boolean>(false);
  const [twoStepVerifyDialog, setTwoStepVerifyDialog] =
    useState<boolean>(false);

  console.log("auth :", twoStepVerifyDialog);

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<string>(
    userData?.user?.isTwoFactorEnabled as string
  );

  useEffect(() => {
    setIsTwoFactorEnabled(userData.user?.isTwoFactorEnabled as string);
  }, [userData]);

  const [authenticationCodeDialog, setAuthenticationCodeDialog] =
    useState<boolean>(false);

  const [twoStepVerifyNotiDialog, setTwoStepVerifyNotiDialog] =
    useState<boolean>(false);
  const [phoneNumberTextCodeDialog, setPhoneNumberTextCodeDialog] =
    useState<boolean>(false);

  const [verifyIdentity] = useVerifyIdentityMutation();
  const [setup2FA] = useSetup2FAMutation();
  const [verify2FA] = useVerify2FAMutation();

  const [verifyError, setVerifyError] = useState<string | null>("");

  const handleVerifyPassword = async () => {
    // 🛑 Basic validation
    if (!currentPassword || currentPassword.trim().length === 0) {
      setVerifyError("Please enter your current password");
      return;
    }

    try {
      // 🌀 Optional: setLoading(true);

      const res = await verifyIdentity({
        method: "password",
        password: currentPassword,
      }).unwrap();

      setIsContinueSetUp(true);
      setTwoStepVerifyDialog(false);
      setCurrentPassword("");
    } catch (error: any) {
      setVerifyError(error);

      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Failed to verify password. Please try again.";

      setVerifyError(errorMessage);
    } finally {
      // 🌀 Optional: setLoading(false);
    }
  };

  const [qrCode, setQrCode] = useState<string | null>("");
  const [secretKey, setSecretKey] = useState<string | null>("");
  const [oneTimeCode, setOneTimeCode] = useState<string | null>("");

  const handleAuthenticationCode = async () => {
    try {
      const res = await setup2FA().unwrap();
      setQrCode(res.data.qrCode);
      setSecretKey(res.data.secret);
      setIsContinueSetUp(false);
      setAuthenticationCodeDialog(true);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Failed to send authentication code. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleVerifyAuthenticationCode = async () => {
    console.log(oneTimeCode);
    if (!oneTimeCode) return;
    try {
      await verify2FA({ code: oneTimeCode }).unwrap();
      dispatch(
        setCredentials({
          user: { ...userData.user, isTwoFactorEnabled: true },
          accessToken: userData.accessToken,
        })
      );
      setIsContinueScanCode(true);
      setAuthenticationCodeDialog(false);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        error?.message ||
        "Failed to send authentication code. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-24">
      <div className="space-y-1">
        <p className="font-medium">2-step Verification</p>
        <p className="text-[13px] text-muted-foreground">
          Add an additional layer of security to your account during login.
        </p>
      </div>

      {!isTwoFactorEnabled ? (
        <Dialog
          open={twoStepVerifyDialog}
          onOpenChange={(open) => setTwoStepVerifyDialog(open)}
        >
          <DialogTrigger>
            <Button variant={"outline"} size={"sm"}>
              Add Verification method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <div className="flex flex-col items-center text-center gap-2 py-2">
              <div className="w-10 h-10 rounded-full border relative">
                <img
                  src={userData.user?.avatar!}
                  className="rounded-full border"
                  alt=""
                />
                <div className="absolute rounded-full p-1 bg-white -bottom-1 -right-1 w-fit">
                  <FaLock className="text-red-500" size={12} />
                </div>
              </div>
              <p className="text-base font-semibold mt-4">
                To continue, we need to verify your identity
              </p>
              <p className="text-muted-foreground">{userData.user?.email}</p>
            </div>
            <div className="space-y-2">
              <Input
                value={currentPassword!}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setVerifyError("");
                }}
                placeholder="Your password"
                type="password"
                className="h-9 rounded-md placeholder:tracking-normal tracking-[0.1rem]"
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
              />
            </div>
            {verifyError && (
              <p className="text-sm font-medium text-red-500 text-center">
                {verifyError}
              </p>
            )}
            <div className="space-y-2">
              <Button
                onClick={handleVerifyPassword}
                size={"md"}
                className="w-full"
              >
                Continue
              </Button>
              <Button
                onClick={handleVerifyPassword}
                variant={"ghost"}
                size={"md"}
                className="w-full"
              >
                <p className="text-muted-foreground">Forgot password?</p>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          open={twoStepVerifyNotiDialog}
          onOpenChange={(open) => setTwoStepVerifyNotiDialog(open)}
        >
          <DialogTrigger>
            <Button variant={"outline"} size={"sm"}>
              Change Verification methods
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center text-center gap-2 py-2">
              <ShieldCheck size={32} className="text-green-500" />
              <p className="text-base font-semibold mt-4">
                2-step verification with authenticator is turned on
              </p>
              <p className="text-muted-foreground">
                Every time you enter your password, Notion will ask you for a
                verification code to confirm your identity.
              </p>
            </div>

            <div className="space-y-2">
              <Button
                // onClick={() => {
                //   setIsSetPassword(true);
                //   setPasswordDialog(false);
                // }}
                variant={"outline"}
                size={"md"}
                className="w-full"
              >
                <p className="text-muted-foreground">View 2-step methods</p>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog
        open={isContinueSetUp}
        onOpenChange={(open) => setIsContinueSetUp(open)}
      >
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <ShieldCheck size={32} />
            <p className="text-base font-semibold mt-4">
              Turn on 2-step Verify
            </p>
            <p className="text-muted-foreground">
              Confirm it’s you when you use a password with a Verify code
            </p>
          </div>
          <div className="w-full space-y-2">
            <Button
              onClick={handleAuthenticationCode}
              variant={"outline"}
              className="w-full justify-start h-16"
            >
              <ClockFading className="mx-1 [&_svg:not([class*='size-'])]:size-4 text-muted-foreground" />
              <div className="text-left">
                <p>Code from authentication</p>
                <p className="text-xs font-normal text-muted-foreground">
                  Generate a one-time code in your authenticator app
                </p>
              </div>
            </Button>
            <Button
              onClick={() => {
                setIsContinueSetUp(false);
                setPhoneNumberTextCodeDialog(true);
              }}
              variant={"outline"}
              className="w-full justify-start h-16"
            >
              <Smartphone className="mx-1 [&_svg:not([class*='size-'])]:size-4 text-muted-foreground" />
              <div className="text-left">
                <p>Text me a code</p>
                <p className="text-xs font-normal text-muted-foreground">
                  Add and verify your phone number
                </p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={authenticationCodeDialog}
        onOpenChange={(open) => setAuthenticationCodeDialog(open)}
      >
        <DialogContent
          onBack={() => {
            setAuthenticationCodeDialog(false);
            setIsContinueSetUp(true);
          }}
          className="sm:max-w-sm"
          showBackButton={true}
        >
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <ShieldCheck size={32} />
            <p className="text-base font-semibold mt-4">
              Scan code in authenticator
            </p>
            <p className="text-muted-foreground">
              Name your authenticator and enter the Verify code to complete
              setup
            </p>
            <img src={qrCode!} className="w-32 my-4"></img>
            <div className="w-full space-y-2 text-left">
              <p className="text-xs text-muted-foreground ml-1">
                Authenticator name
              </p>
              <Input
                // value={confirmNewPassword!}
                // onChange={(e) => {
                //   setConfirmNewPassword(e.target.value);
                // }}
                placeholder="e.g. Duo, Adam"
                type="text"
                className="h-9 rounded-md"
              />
            </div>
            <div className="w-full space-y-2 text-left">
              <p className="text-xs text-muted-foreground ml-1">
                One-time code
              </p>
              <InputOTP
                maxLength={6}
                onChange={(value) => {
                  console.log(value);
                  setOneTimeCode(value);
                }}
              >
                <InputOTPGroup className="w-full flex justify-between!">
                  <InputOTPSlot
                    className="h-16 w-12 border rounded-md! text-2xl font-semibold"
                    index={0}
                  />
                  <InputOTPSlot
                    className="h-16 w-12 border rounded-md! text-2xl font-semibold"
                    index={1}
                  />
                  <InputOTPSlot
                    className="h-16 w-12 border rounded-md! text-2xl font-semibold"
                    index={2}
                  />
                  <InputOTPSlot
                    className="h-16 w-12 border rounded-md! text-2xl font-semibold"
                    index={3}
                  />
                  <InputOTPSlot
                    className="h-16 w-12 border rounded-md! text-2xl font-semibold"
                    index={4}
                  />
                  <InputOTPSlot
                    className="h-16 w-12 border rounded-md! text-2xl font-semibold"
                    index={5}
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              onClick={handleVerifyAuthenticationCode}
              size={"md"}
              className="w-full"
            >
              Continue
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
              <p className="text-muted-foreground">Can't scan code?</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={phoneNumberTextCodeDialog}
        onOpenChange={(open) => setPhoneNumberTextCodeDialog(open)}
      >
        <DialogContent
          onBack={() => {
            setPhoneNumberTextCodeDialog(false);
            setIsContinueSetUp(true);
          }}
          className="sm:max-w-sm"
          showBackButton={true}
        >
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <ShieldCheck size={32} />
            <p className="text-base font-semibold mt-4">Add a phone number</p>
            <p className="text-muted-foreground">
              Enter your phone number to receive a 2-step verification code.
            </p>
          </div>
          <div className="w-full space-y-2 text-left">
            <Input
              // value={confirmNewPassword!}
              // onChange={(e) => {
              //   setConfirmNewPassword(e.target.value);
              // }}
              placeholder="Enter phone number"
              type="text"
              className="h-9 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Button
              onClick={() => {
                setIsContinueScanCode(true);
                setPhoneNumberTextCodeDialog(false);
              }}
              size={"md"}
              className="w-full"
            >
              Continue
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
              <p className="text-muted-foreground">Need help?</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isContinueScanCode}>
        <DialogContent showCloseButton={false} className="sm:max-w-sm">
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <ShieldCheck size={32} />
            <p className="text-base font-semibold mt-4">
              Save your backup codes
            </p>
            <p className="text-muted-foreground">
              You can only see this once, so be sure to keep them to avoid
              getting locked out of your account.
            </p>
          </div>
          <div className="w-full flex flex-wrap p-3 bg-blue-500/10 text-blue-500 font-medium">
            <p className="break-all">{secretKey}</p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => {
                setTwoStepVerifyNotiDialog(true);
                setIsContinueScanCode(false);
              }}
              size={"md"}
              className="w-full"
            >
              I’ve saved them
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
              <p className="text-muted-foreground">Download as text file</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={twoStepVerifyNotiDialog}
        onOpenChange={(open) => setTwoStepVerifyNotiDialog(open)}
      >
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <ShieldCheck size={32} className="text-green-500" />
            <p className="text-base font-semibold mt-4">
              2-step verification with authenticator is turned on
            </p>
            <p className="text-muted-foreground">
              Every time you enter your password, Notion will ask you for a
              verification code to confirm your identity.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              // onClick={() => {
              //   setIsSetPassword(true);
              //   setPasswordDialog(false);
              // }}
              variant={"outline"}
              size={"md"}
              className="w-full"
            >
              <p className="text-muted-foreground">View 2-step methods</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TwoStepVerifySection;
