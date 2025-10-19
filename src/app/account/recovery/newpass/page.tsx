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
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { apiFetchClient } from "@/lib/apiClient.client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const NewPass = () => {
  const [isPending, startTransitionn] = useTransition();
  const [otp, setOtp] = useState<string>();
  const [recoveryEmail, setRecoveryEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedEmal = localStorage.getItem("recovery_email");
    const storedOtp = localStorage.getItem("recovery_otp");
    if (storedEmal && storedOtp) {
      setRecoveryEmail(storedEmal);
      setOtp(storedOtp);
    } else {
      router.push("/account/login");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    startTransitionn(async () => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const res = await apiFetchClient(
        `/auth/changepassword/${otp}/${recoveryEmail}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (res) {
        toast("Password changed successfully!");
        localStorage.clear();
        e.currentTarget.reset();
        router.push("/account/login");
      }
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow justify-center items-center">
        <div className="w-100">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Recover your account</CardTitle>
              <CardDescription>Enter your New Password</CardDescription>
            </CardHeader>
            <CardContent className="mt-7">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">New Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    minLength={8}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="repeatPassword">New Password Repeat</Label>
                  </div>
                  <Input
                    id="repeatPassword"
                    type="password"
                    name="repeatPassword"
                    minLength={8}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                disabled={isPending}
                aria-label="Save"
              >
                {isPending ? <Spinner /> : <>Save</>}
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
          </form>
        </div>
      </div>
      <FooterSmall />
    </div>
  );
};

export default NewPass;
