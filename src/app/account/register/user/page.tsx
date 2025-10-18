import FooterSmall from "@/components/FooterSmall";
import RegisterForm from "@/components/RegisterForm";
import { apiFetch } from "@/lib/apiClient.server";
import React from "react";

export const metadata = {
  title: "Register - EMarket",
  description: "User register.",
};

type provinceType = {
  id: number;
  name: string;
};

const UserRegisterPage = async () => {
  const provinces = await apiFetch<provinceType[]>(`/open/province`, {
    mode: "revalidate",
    revalidateSeconds: 18000,
  });

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
