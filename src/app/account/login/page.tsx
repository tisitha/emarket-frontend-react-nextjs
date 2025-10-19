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
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [isPending, startTransaction] = useTransition();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    startTransaction(async () => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const obj = Object.fromEntries(formData.entries());

      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.status == 200) {
        toast.success("Logging successfull");
        (e.target as HTMLFormElement).reset();
        window.location.href = "/";
      } else {
        toast.error("Email or password incorrect");
      }
    });
  };

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex justify-center items-center max-h-dvh h-full">
        <div className="w-100">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-7">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                  <Link
                    href={"/account/recovery/verifyaccount"}
                    className="inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                disabled={isPending}
                aria-label="Login"
              >
                {isPending ? <Spinner /> : <>Login</>}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full hover:cursor-pointer mt-3"
                asChild
              >
                <Link href={"/account/register"}>Create new account</Link>
              </Button>
            </CardFooter>
          </form>
        </div>
      </div>
      <FooterSmall />
    </div>
  );
}
