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
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [massage, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const json = Object.fromEntries(formData.entries());

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(json),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const clonedResponse = res.clone();

    if (clonedResponse.ok) {
      window.location.href = "/";
    } else {
      console.log(clonedResponse);
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow justify-center items-center">
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
                    type="email"
                    name="email"
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
                    href={""}
                    className="inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button type="submit" className="w-full hover:cursor-pointer">
                Login
              </Button>
              <Button
                formNoValidate
                variant="outline"
                className="w-full hover:cursor-pointer mt-3"
              >
                <Link href={""}>Create new account</Link>
              </Button>
            </CardFooter>
          </form>
        </div>
      </div>
      <FooterSmall />
    </div>
  );
}
