import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { apiFetch } from "@/lib/apiClient.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import DataEditBtn from "@/components/DataEditBtn";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const role = cookieStore.get("user_role")?.value;

  if (token == null) {
    redirect("/account/login");
  }

  const isVendor = role == "ROLE_VENDOR" ? true : false;

  const account = await apiFetch<accountType>(`/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const provinces = (await apiFetch<provinceType[]>(`/open/province`)) || [];

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1360px] w-full px-3">
          <div className="flex flex-col max-w-[1200px] w-full py-20">
            <div className="max-w-[400px] w-full mx-auto bg-white rounded-2xl outline py-7">
              <CardHeader>
                <CardTitle className="text-2xl font-bold mx-auto">
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-7">
                <div className="flex flex-col gap-6">
                  <div>
                    <DataEditBtn
                      title={"First name"}
                      placeholder={account?.fname}
                      baseUrl={
                        isVendor ? "/user/vendor-update" : "/user/user-update"
                      }
                      token={token}
                      name={"fname"}
                    />
                  </div>
                  <div>
                    <DataEditBtn
                      title={"Last name"}
                      placeholder={account?.lname}
                      baseUrl={
                        isVendor ? "/user/vendor-update" : "/user/user-update"
                      }
                      token={token}
                      name={"lname"}
                    />
                  </div>
                  <div>
                    <DataEditBtn
                      title={"Email"}
                      placeholder={account?.email}
                      baseUrl={
                        isVendor ? "/user/vendor-update" : "/user/user-update"
                      }
                      token={token}
                      name={"email"}
                    />
                  </div>
                  <div>
                    <DataEditBtn
                      title={"Contact No"}
                      placeholder={account?.phoneNo}
                      baseUrl={
                        isVendor ? "/user/vendor-update" : "/user/user-update"
                      }
                      token={token}
                      name={"phoneNo"}
                    />
                  </div>
                  <div>
                    <DataEditBtn
                      title={"Address"}
                      placeholder={account?.address}
                      baseUrl={
                        isVendor ? "/user/vendor-update" : "/user/user-update"
                      }
                      token={token}
                      name={"address"}
                    />
                  </div>
                  <div>
                    <DataEditBtn
                      title={"Province"}
                      placeholder={account?.province.id}
                      baseUrl={
                        isVendor ? "/user/vendor-update" : "/user/user-update"
                      }
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
