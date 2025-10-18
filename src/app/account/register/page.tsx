import FooterSmall from "@/components/FooterSmall";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Register - EMarket",
  description: "Vendor register.",
};

const RegisterPage = async () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow flex-col justify-center items-center my-16">
        <div className="w-200 flex justify-center gap-5">
          <Link href={"/account/register/user"}>
            <div className="outline w-50 h-50 rounded-3xl flex flex-col justify-center items-center gap-5 font-medium hover:shadow-2xl">
              <Image
                draggable={false}
                width={50}
                height={50}
                src={"/icons8-user-100.png"}
                alt="user_icon"
              />
              Create User Account
            </div>
          </Link>
          <Link href={"/account/register/vendor"}>
            <div className="outline w-50 h-50 rounded-3xl flex flex-col justify-center items-center gap-5 font-medium hover:shadow-2xl">
              <Image
                draggable={false}
                width={50}
                height={50}
                src={"/icons8-vendor-100.png"}
                alt="vendor_icon"
              />
              Create Vendor Account
            </div>
          </Link>
        </div>
        <Link
          href={"/account/login"}
          className="inline-block text-sm underline-offset-4 hover:underline my-5"
        >
          Already have an account?
        </Link>
        <Button
          variant="outline"
          className="w-100 hover:cursor-pointer"
          asChild
        >
          <Link href={"/"}>Go Home</Link>
        </Button>
      </div>

      <FooterSmall />
    </div>
  );
};

export default RegisterPage;
