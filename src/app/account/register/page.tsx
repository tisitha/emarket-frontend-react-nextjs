import FooterSmall from "@/components/FooterSmall";
import Link from "next/link";
import React from "react";

const RegisterPage = async () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow justify-center items-center  my-16">
        <div className="w-100">
          <Link href={"/account/regiter/user"} className="outline w-50">
            User Account
          </Link>
          <Link href={"/account/regiter/user"}>Vendor Account</Link>
        </div>
      </div>
      <FooterSmall />
    </div>
  );
};

export default RegisterPage;
