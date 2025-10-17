"use client";

import { Label } from "@radix-ui/react-label";
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
import { toast } from "sonner";
import { useTransition } from "react";
import { apiFetchClient } from "@/lib/apiClient.client";
import { Spinner } from "./ui/spinner";

type Props = {
  provinces?: provinceType[];
  vendor: boolean;
};

const RegisterForm = ({ provinces = [], vendor }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const rawData = Object.fromEntries(formData.entries());

      const data = {
        ...rawData,
        provinceId: Number(rawData.provinceId),
      };

      const url = vendor ? "/auth/register-vendor" : "/auth/register-user";

      const res = await apiFetchClient(`${url}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res) {
        toast.success("Account registered successfully");
        router.push("/account/login");
      } else {
        toast.error("Sorry, something went wrong! please try again!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>It's quick and easy</CardDescription>
      </CardHeader>
      <CardContent className="mt-7">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="fname">First name</Label>
            <Input
              id="fname"
              type="text"
              name="fname"
              autoComplete="given-name"
              placeholder="John"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lname">Last name</Label>
            <Input
              id="lname"
              type="text"
              name="lname"
              autoComplete="family-name"
              placeholder="Doe"
              required
            />
          </div>
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
              placeholder="********"
              required
              minLength={8}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="passwordRepeat">Password repeat</Label>
            </div>
            <Input
              id="passwordRepeat"
              type="password"
              name="passwordRepeat"
              placeholder="********"
              required
              minLength={8}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNo">Contact No</Label>
            <Input
              id="phoneNo"
              type="tel"
              name="phoneNo"
              autoComplete="tel"
              placeholder="+000000000"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              autoComplete="address-level3"
              name="address"
              placeholder="0/0, streat, city"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="provinceId">Province</Label>
            <select
              id="provinceId"
              name="provinceId"
              className="select h-9 w-full min-w-0 outline"
            >
              {provinces.map((province, key) => (
                <option key={key} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          {vendor && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bankAccountNo">Account No</Label>
                <Input
                  id="bankAccountNo"
                  type="text"
                  name="bankAccountNo"
                  placeholder="123456789"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bank">Name of Bank</Label>
                <Input
                  id="bank"
                  type="text"
                  name="bank"
                  placeholder="Name of Bank"
                  required
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-5">
        <Button
          disabled={isPending}
          type="submit"
          className="w-full hover:cursor-pointer"
        >
          {isPending ? <Spinner /> : <>Register</>}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full hover:cursor-pointer mt-3"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
