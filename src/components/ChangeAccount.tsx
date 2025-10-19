"use client";

import { apiFetchClient } from "@/lib/apiClient.client";
import { Label } from "@radix-ui/react-label";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

type Props = {
  token: string;
  email?: string;
  version: "vendor" | "user" | "delete";
};

const ChangeAccount = ({ token, email, version }: Props) => {
  const [isPending, startTransitionn] = useTransition();
  const router = useRouter();

  const url =
    version == "vendor"
      ? "/user/usertovendor-update"
      : version == "user"
      ? "/user/vendortouser-update"
      : version == "delete" && "/user/user-delete";

  const title =
    version == "vendor"
      ? "Upgrade Your Account to Vendor Account"
      : version == "user"
      ? "Change Your Account to User(Buyer Only) Account"
      : version == "delete" && "Delete your Account";

  const description =
    version == "vendor"
      ? "It's quick and easy."
      : version == "user"
      ? "When you switch to a user account, you will lose any data relate to your store."
      : version == "delete" &&
        "When you delete your account, your data will be permanently removed.";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    startTransitionn(async () => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const res = await apiFetchClient(`${url}`, {
        method: version == "delete" ? "DELETE" : "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      (e.target as HTMLFormElement).reset();
      if (res) {
        if (version == "delete") {
          await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
          });
          router.push("/");
        } else {
          const logingData = {
            email: email,
            password: data.password,
          };
          await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(logingData),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          window.location.href = "/settings";
        }
        toast.success("Account type changed successfully!");
      } else {
        toast.error("Sorry, something went wrong! Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-7">
        {version == "vendor" && (
          <>
            <div className="grid gap-2 mt-4">
              <div className="flex items-cente r">
                <Label htmlFor="businessName">Business Name</Label>
              </div>
              <Input
                id="businessName"
                type="text"
                name="businessName"
                maxLength={255}
                required
              />
            </div>

            <div className="grid gap-2 mt-4">
              <div className="flex items-center">
                <Label htmlFor="bankAccountNo">Account No</Label>
              </div>
              <Input
                id="bankAccountNo"
                type="text"
                name="bankAccountNo"
                maxLength={255}
                required
              />
            </div>
            <div className="grid gap-2 mt-4">
              <div className="flex items-center">
                <Label htmlFor="bank">Name of Bank</Label>
              </div>
              <Input
                id="bank"
                type="text"
                name="bank"
                maxLength={255}
                required
              />
            </div>
          </>
        )}
        <div className="flex flex-col gap-6 mt-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              maxLength={255}
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
          aria-label="submit"
        >
          {isPending ? (
            <Spinner />
          ) : version == "delete" ? (
            <>Delete</>
          ) : (
            <>Confirm</>
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

export default ChangeAccount;
