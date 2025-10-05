import FooterSmall from "@/components/FooterSmall";
import RegisterForm from "@/components/RegisterForm";
import React from "react";

type provinceType = {
  id: number;
  name: string;
};

const UserRegisterPage = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = await fetch(`${apiUrl}/open/province`);
  const provinces: provinceType[] = await data.json();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow justify-center items-center  my-16">
        <div className="w-100">
          <RegisterForm provinces={provinces} vendor={false} />
        </div>
      </div>
      <FooterSmall />
    </div>
  );
};

export default UserRegisterPage;
