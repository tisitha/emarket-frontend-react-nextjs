import React from "react";
import DataEditBtn from "./DataEditBtn";
import { CardHeader, CardTitle, CardContent } from "./ui/card";
import { apiFetch } from "@/lib/apiClient.server";

type Props = {
  token: string;
  isVendor: boolean;
};

const Profile = async ({ token, isVendor }: Props) => {
  const account = await apiFetch<accountType>(`/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const provinces =
    (await apiFetch<provinceType[]>(`/open/province`, {
      mode: "revalidate",
      revalidateSeconds: 18000,
    })) || [];

  return (
    <div className="max-w-[400px] w-full mx-auto bg-white py-7">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mx-auto">Profile</CardTitle>
      </CardHeader>
      <CardContent className="mt-7">
        <div className="flex flex-col gap-6">
          <div>
            <DataEditBtn
              title={"First name"}
              placeholder={account?.fname}
              baseUrl={isVendor ? "/user/vendor-update" : "/user/user-update"}
              token={token}
              name={"fname"}
            />
          </div>
          <div>
            <DataEditBtn
              title={"Last name"}
              placeholder={account?.lname}
              baseUrl={isVendor ? "/user/vendor-update" : "/user/user-update"}
              token={token}
              name={"lname"}
            />
          </div>
          <div>
            <DataEditBtn
              title={"Email"}
              placeholder={account?.email}
              baseUrl={isVendor ? "/user/vendor-update" : "/user/user-update"}
              token={token}
              name={"email"}
            />
          </div>
          <div>
            <DataEditBtn
              title={"Contact No"}
              placeholder={account?.phoneNo}
              baseUrl={isVendor ? "/user/vendor-update" : "/user/user-update"}
              token={token}
              name={"phoneNo"}
            />
          </div>
          <div>
            <DataEditBtn
              title={"Address"}
              placeholder={account?.address}
              baseUrl={isVendor ? "/user/vendor-update" : "/user/user-update"}
              token={token}
              name={"address"}
            />
          </div>
          <div>
            <DataEditBtn
              title={"Province"}
              placeholder={account?.province.id}
              baseUrl={isVendor ? "/user/vendor-update" : "/user/user-update"}
              defaultVal={account?.province.name}
              isSelect={true}
              selectList={provinces}
              token={token}
              name={"provinceId"}
            />
          </div>
          {isVendor && (
            <>
              <div>
                <DataEditBtn
                  title={"Business Name"}
                  placeholder={account?.businessName}
                  baseUrl={"/user/vendor-update"}
                  token={token}
                  name={"businessName"}
                />
              </div>
              <div>
                <DataEditBtn
                  title={"Account No"}
                  placeholder={account?.bankAccountNo}
                  baseUrl={"/user/vendor-update"}
                  token={token}
                  name={"bankAccountNo"}
                />
              </div>
              <div>
                <DataEditBtn
                  title={"Name of Bank"}
                  placeholder={account?.bank}
                  baseUrl={"/user/vendor-update"}
                  token={token}
                  name={"bank"}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default Profile;
