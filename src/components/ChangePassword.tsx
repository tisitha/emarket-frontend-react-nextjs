"use client";

import { Label } from "@radix-ui/react-label";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { apiFetchClient } from "@/lib/apiClient.client";
import { Spinner } from "./ui/spinner";

type Props = {
  token: string;
};

const ChangePassword = ({ token }: Props) => {
  const [isPending, startTransitionn] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    startTransitionn(async () => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const res = await apiFetchClient(`/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res) {
        toast("Password changed successfully!");
      } else {
        toast.error("Sorry, something went wrong! Please try again.");
      }
      (e.target as HTMLFormElement).reset();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
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
              maxLength={255}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="passwordRepeat">New Password Repeat</Label>
            </div>
            <Input
              id="passwordRepeat"
              type="password"
              name="passwordRepeat"
              minLength={8}
              maxLength={255}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="currentPassword">Current Password</Label>
            </div>
            <Input
              id="currentPassword"
              type="password"
              name="currentPassword"
              minLength={8}
              maxLength={255}
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
          aria-label="Submit"
        >
          {isPending ? <Spinner /> : <>Save</>}
        </Button>
      </CardFooter>
    </form>
  );
};

export default ChangePassword;
