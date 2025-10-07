import FooterSmall from "@/components/FooterSmall";
import RegisterForm from "@/components/RegisterForm";
import { apiFetch } from "@/lib/apiClient.server";
import React from "react";

type provinceType = {
  id: number;
  name: string;
};

const VendorRegisterPage = async () => {
  const provinces = await apiFetch<provinceType[]>(`/open/province`);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow justify-center items-center  my-16">
        <div className="w-100">
          <RegisterForm provinces={provinces} vendor={true} />
        </div>
      </div>
      <FooterSmall />
    </div>
  );
};

export default VendorRegisterPage;
