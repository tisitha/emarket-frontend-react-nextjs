import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Orders from "@/components/Orders";
import Questions from "@/components/Questions";
import VendorProducts from "@/components/VendorProducts";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export const metadata = {
  title: "Dashboard - EMarket",
  description: "User Dashboard.",
};

const Dashboard = async ({ searchParams }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const role = cookieStore.get("user_role")?.value;
  const userId = cookieStore.get("user_id")?.value;

  const {
    ohpagenumber = 0,
    opagenumber = 0,
    ppagenumber = 0,
    psortby = "name",
    pdir = "asc",
  } = await searchParams;

  const options: sortOptionType[] = [
    {
      name: "Alphabetically, A-Z",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=name&pdir=asc`,
    },
    {
      name: "Alphabetically, Z-A",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=name&pdir=desc`,
    },
    {
      name: "Price, low to high",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=price&pdir=asc`,
    },
    {
      name: "Price, high to low",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=price&pdir=desc`,
    },
    {
      name: "Deal, low to high",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=deal&pdir=asc`,
    },
    {
      name: "Deal, high to low",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=deal&pdir=desc`,
    },
    {
      name: "Quantity, low to high",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=quantity&pdir=asc`,
    },
    {
      name: "Quantity, high to low",
      href: `/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=quantity&pdir=desc`,
    },
  ];

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
              {role == "ROLE_VENDOR" ? (
                <>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Products"
                    defaultChecked
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6">
                    <VendorProducts
                      pagenumber={Number(ppagenumber)}
                      prefix={`/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=${opagenumber}&ppagenumber=`}
                      postfix={`&psortby=${psortby}&pdir=${pdir}`}
                      vendor={userId}
                      sortBy={psortby}
                      dir={pdir}
                      options={options}
                      token={token}
                    />
                  </div>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Questions"
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6">
                    <Questions token={token} />
                  </div>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Orders"
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6">
                    <Orders
                      token={token}
                      pageNumber={Number(opagenumber)}
                      version={"VENDOR"}
                      prefix={`/dashboard?ohpagenumber=${ohpagenumber}&opagenumber=`}
                      postfix={`&ppagenumber=${ppagenumber}&psortby=${psortby}&pdir=${pdir}`}
                    />
                  </div>
                  <input
                    type="radio"
                    name="my_tabs_6"
                    className="tab"
                    aria-label="Buying History"
                  />
                  <div className="tab-content bg-base-100 border-base-300 p-6">
                    <Orders
                      token={token}
                      pageNumber={Number(ohpagenumber)}
                      version={"USER"}
                      prefix={`/dashboard?ohpagenumber=`}
                      postfix={`&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=${psortby}&pdir=${pdir}`}
                    />
                  </div>
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
                    <Orders
                      token={token}
                      pageNumber={Number(ohpagenumber)}
                      version={"USER"}
                      prefix={`/dashboard?ohpagenumber=`}
                      postfix={`&opagenumber=${opagenumber}&ppagenumber=${ppagenumber}&psortby=${psortby}&pdir=${pdir}`}
                    />
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

export default Dashboard;
