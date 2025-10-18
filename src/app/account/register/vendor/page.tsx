import FooterSmall from "@/components/FooterSmall";
import RegisterForm from "@/components/RegisterForm";
import { apiFetch } from "@/lib/apiClient.server";
import React from "react";

const VendorRegisterPage = async () => {
  const provinces = await apiFetch<provinceType[]>(`/open/province`, {
    mode: "revalidate",
    revalidateSeconds: 18000,
  });

  return (
    <div className="flex h-dvh flex-col">
      <div className="flex justify-center items-center my-16 max-h-dvh h-full">
        <div className="w-100">
          <RegisterForm provinces={provinces} vendor={true} />
        </div>
      </div>
      <FooterSmall />
    </div>
  );
};

export default VendorRegisterPage;
