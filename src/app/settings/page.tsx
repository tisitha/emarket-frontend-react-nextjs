import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Profile from "@/components/Profile";
import ChangePassword from "@/components/ChangePassword";
import ChangeAccount from "@/components/ChangeAccount";

export const metadata = {
  title: "Settings - EMarket",
  description: "Settings page.",
};

const Settings = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const role = cookieStore.get("user_role")?.value;
  const email = cookieStore.get("user_email")?.value;

  if (token == null) {
    redirect("/account/login");
  }

  const isVendor = role == "ROLE_VENDOR" ? true : false;

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1360px] w-full px-3">
          <div className="flex flex-col max-w-[1000px] w-full py-20">
            <div className="tabs tabs-lift">
              <input
                type="radio"
                name="my_tabs_6"
                className="tab"
                aria-label="&nbsp;Profile&nbsp;"
                defaultChecked
              />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <Profile token={token} isVendor={isVendor} />
              </div>

              <input
                type="radio"
                name="my_tabs_6"
                className="tab"
                aria-label="&nbsp;Change password&nbsp;"
              />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <div className="max-w-[400px] w-full mx-auto bg-white py-7">
                  <ChangePassword token={token} />
                </div>
              </div>
              {isVendor ? (
                <>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="&nbsp;Switch to user account&nbsp;"
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div className="max-w-[400px] w-full mx-auto bg-white py-7">
                      <ChangeAccount
                        token={token}
                        email={email}
                        version={"user"}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="&nbsp;Switch to vendor account&nbsp;"
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div className="max-w-[400px] w-full mx-auto bg-white py-7">
                      <ChangeAccount
                        token={token}
                        email={email}
                        version={"vendor"}
                      />
                    </div>
                  </div>
                </>
              )}
              <input
                type="radio"
                name="my_tabs_6"
                className="tab"
                aria-label="&nbsp;Delete account&nbsp;"
              />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <div className="max-w-[400px] w-full mx-auto bg-white py-7">
                  <ChangeAccount token={token} version={"delete"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
