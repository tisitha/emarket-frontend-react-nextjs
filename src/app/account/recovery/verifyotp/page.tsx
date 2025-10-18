"use client";

import FooterSmall from "@/components/FooterSmall";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { apiFetchClient } from "@/lib/apiClient.client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const page = () => {
  const [isPending, startTransitionn] = useTransition();
  const [otp, setOtp] = useState<number>();
  const [recoveryEmail, setRecoveryEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("recovery_email");
    if (stored) {
      setRecoveryEmail(stored);
    } else {
      router.push("/account/login");
    }
  }, []);

  const handleClick = () => {
    startTransitionn(async () => {
      const res = await apiFetchClient(
        `/auth/verifyotp/${otp}/${recoveryEmail}`,
        {
          method: "POST",
        }
      );

      if (res) {
        localStorage.setItem("recovery_otp", String(otp));
        router.push("/account/recovery/newpass");
      } else {
        toast.error("Invalid OTP");
      }
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow justify-center items-center">
        <div className="w-100">
          <CardHeader>
            <CardTitle>Recover your account</CardTitle>
            <CardDescription>
              Check your emails and enter provided OTP to verify
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-7">
            <div className="flex items-center justify-center">
              <InputOTP
                onChange={(value) => setOtp(Number(value))}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-5">
            <Button
              className="w-full hover:cursor-pointer"
              disabled={isPending}
              onClick={handleClick}
              aria-label="Submit"
            >
              {isPending ? <Spinner /> : <>Submit</>}
            </Button>
            <Button
              variant="outline"
              className="w-full hover:cursor-pointer"
              aria-label="Cancel"
              asChild
            >
              <Link href={"/account/login"}>Cancel</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
      <FooterSmall />
    </div>
  );
};

export default page;
