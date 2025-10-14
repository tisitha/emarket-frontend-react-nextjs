import CustomPagination from "@/components/CustomPagination";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import History from "@/components/History";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  version: "vendor" | "user" | "admin";
};

const page = async ({ searchParams, version }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const { ohpagenumber = 0 } = await searchParams;

  if (token == null) {
    redirect("/account/login");
  }

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1360px] w-full px-3">
          <div className="flex flex-col max-w-[1000px] w-full py-20">
            <div className="tabs tabs-lift">
              {version == "vendor" ? (
                <>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Products"
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6"></div>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Orders"
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6"></div>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Buying History"
                    defaultChecked
                  />
                </>
              ) : version == "admin" ? (
                <>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Buying History"
                    defaultChecked
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6"></div>
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Orders"
                    defaultChecked
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6">
                    <History token={token} pageNumber={Number(ohpagenumber)} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
