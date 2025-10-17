import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/shared/components/ui/button";
import { Check, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useChangeEmailMutation,
  useConfirmNewEmailMutation,
  useVerifyCurrentEmailMutation,
  useVerifyNewEmailMutation,
} from "@/features/user/infrastructure/api/userApi";
import { setCredentials } from "@/store/slices/authSlice";

const EmailSection = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const currentEmail = auth?.user?.email;

  const [isChangePasswordDialog, setIsChangePasswordDialog] =
    useState<boolean>(false);
  const [isChangePasswordSuccess, setIsChangePasswordSuccess] =
    useState<boolean>(false);
  const [isSendVerificationCode, setIsSendVerificationCode] =
    useState<boolean>(false);
  const [isContinueVerificationCode, setIsContinueVerificationCode] =
    useState<boolean>(false);
  const [
    isSendVerificationCodeToNewEmail,
    setIsSendVerificationCodeToNewEmail,
  ] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");
  const [verifyNewEmailError, setVerifyNewEmailError] = useState<string | null>(
    ""
  );

  const [changeEmail, { isLoading: changeEmailLoading }] =
    useChangeEmailMutation();
  const [verifyCurrentEmail, { isLoading: verifyCurrentEmailLoading }] =
    useVerifyCurrentEmailMutation();
  const [verifyNewEmail, { isLoading: verifyNewEmailLoading }] =
    useVerifyNewEmailMutation();
  const [confirmNewEmail, { isLoading: confirmNewEmailLoading }] =
    useConfirmNewEmailMutation();

  const [verifyCurrentCode, setVerifyCurrentCode] = useState<string | null>("");
  const [verifyNewCode, setVerifyNewCode] = useState<string | null>("");

  const handleSendVerificationCode = async () => {
    if (!auth?.user?.email) return;

    try {
      // Trigger sending the verification code to the current email
      await verifyCurrentEmail({ currentEmail: auth.user.email });
      setIsSendVerificationCode(true);
    } catch (error) {
      console.error("Failed to send verification code", error);
    }
  };

  const handleContinueVerification = async () => {
    if (!newEmail) return;

    try {
      // Trigger sending the verification code to the new email
      await verifyNewEmail({ newEmail });
      setIsContinueVerificationCode(true);
    } catch (error) {
      console.error("Failed to send verification code to new email", error);
    }
  };

  const handleConfirmNewEmail = async () => {
    if (!newEmail) return;

    try {
      // Confirm the new email and update it in the DB
      await confirmNewEmail({
        newEmail,
        verificationCode: "your-verification-code-here",
      });
      await changeEmail({ newEmail });
      alert("Email updated successfully!");
    } catch (error) {
      console.error("Error confirming new email", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-24">
      <div className="space-y-1">
        <p className="font-medium">Email</p>
        <p className="text-[13px] text-muted-foreground">{auth.user?.email!}</p>
      </div>

      <Dialog
        onOpenChange={(open) => setIsChangePasswordDialog(open)}
        open={isChangePasswordDialog}
      >
        <DialogTrigger
          onClick={() => {
            setIsChangePasswordDialog(true);
          }}
        >
          <Button variant={"outline"} size={"sm"}>
            Change email
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <p>
                Your current email is{" "}
                <span className="text-white font-semibold">
                  {auth.user?.email}
                </span>
                . We’ll send a temporary verification code to this email.
              </p>
            </DialogDescription>
          </DialogHeader>
          {isSendVerificationCode ? (
            <div className="w-full space-y-3">
              <Input
                placeholder="Enter verification code"
                className="h-9 rounded-md"
                onChange={(e) => setVerifyCurrentCode(e.target.value)}
              />
              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}
              {isContinueVerificationCode ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Please enter a new email and we will send you a verification
                    code.
                  </p>
                  <Input
                    value={newEmail!}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setIsSendVerificationCodeToNewEmail(false);
                    }}
                    endIcon={
                      isSendVerificationCodeToNewEmail && (
                        <div className="w-5 h-5 -mr-0.5 rounded-full bg-muted-foreground/50 flex items-center justify-center">
                          <X
                            size={14}
                            strokeWidth={3}
                            className="cursor-pointer text-muted"
                            onClick={() => {
                              setNewEmail("");
                              setIsSendVerificationCodeToNewEmail(false);
                              console.log("Clear email");
                            }}
                          />
                        </div>
                      )
                    }
                    placeholder="Enter new email"
                    className="h-9 rounded-md"
                  />
                  {isSendVerificationCodeToNewEmail ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        We just sent you a temporary verification code to{" "}
                        <span className="font-semibold text-white">
                          {newEmail}
                        </span>
                      </p>
                      <Input
                        onChange={(e) => {
                          setVerifyNewCode(e.target.value);
                        }}
                        placeholder="Enter verification code"
                        className="h-9 rounded-md"
                      />
                      {verifyNewEmailError && (
                        <p className="text-sm font-medium text-red-500">
                          {verifyNewEmailError}
                        </p>
                      )}
                      <Button
                        className="w-full"
                        size={"md"}
                        onClick={async () => {
                          try {
                            const res = await confirmNewEmail({
                              newEmail: newEmail,
                              verificationCode: verifyNewCode,
                            }).unwrap();

                            dispatch(
                              setCredentials({
                                user: { ...auth.user, email: newEmail! },
                                accessToken: auth.accessToken,
                              })
                            );

                            setIsChangePasswordDialog(false);
                            setIsChangePasswordSuccess(true);
                          } catch (error: any) {
                            console.error("Error:", error);
                            setVerifyNewEmailError(
                              error?.data?.message || "Something went wrong"
                            );
                          }
                        }}
                      >
                        Change Email
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        verifyNewEmail({ newEmail: newEmail });
                        setIsSendVerificationCodeToNewEmail(true);
                      }}
                      className="w-full"
                      size={"md"}
                    >
                      Send vertification code
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  onClick={async () => {
                    console.log("currentEmail :", currentEmail);
                    try {
                      const res = await verifyCurrentEmail({
                        currentEmail: currentEmail,
                        verificationCode: verifyCurrentCode,
                      }).unwrap();

                      console.log("res:", res);
                      setIsContinueVerificationCode(true);
                    } catch (error: any) {
                      console.error("Error:", error);
                      setError(error?.data?.message || "Something went wrong");
                    }
                  }}
                  className="w-full"
                  size={"md"}
                >
                  Continue
                </Button>
              )}
            </div>
          ) : (
            <Button
              onClick={() => {
                setIsSendVerificationCode(true);
                changeEmail({ currentEmail: currentEmail });
              }}
              size={"md"}
              className="w-fit"
            >
              Send vertification code
            </Button>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isChangePasswordSuccess}
        onOpenChange={(open) => setIsChangePasswordSuccess(open)}
      >
        <DialogContent className="sm:max-w-sm">
          <div className="flex flex-col items-center text-center gap-2 py-2">
            <Check size={32} />
            <p className="text-base font-semibold mt-4">
              Your email has been change
            </p>
            <p className="text-muted-foreground">
              We’ll ask for this email when you log in to your account.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailSection;
