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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { apiFetchClient } from "@/lib/apiClient.client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const VerifyAccount = () => {
  const [isPending, startTransitionn] = useTransition();
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    startTransitionn(async () => {
      const res = await apiFetchClient(`/auth/verifymail/${email}`, {
        method: "POST",
      });

      if (res) {
        toast.success("Found your account. Check your emails for OTP");
        localStorage.setItem("recovery_email", email);
        router.push("/account/recovery/verifyotp");
      } else {
        toast.error("Can not find an account under proviced email");
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
              Enter your email below to find your account
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-7">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="m@example.com"
                onChange={handleChange}
              />
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
              asChild
              aria-label="Cancel"
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

export default VerifyAccount;
