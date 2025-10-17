import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { apiFetch } from "@/lib/apiClient.server";
import { SearchIcon } from "lucide-react";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

const page = async ({ searchParams }: Props) => {
  const { text } = await searchParams;
  const encoded = encodeURIComponent(text);
  const products = await apiFetch<productType[]>(
    `/open/search?text=${encoded}&size=60`
  );

  return (
    <>
      <Header />
      <div className="max-w-[1366px] pb-[70px] bg-gray-100">
        <div className="bg-none font-bold text-2xl p-[77px] pb-[30px]">
          Best matches for "{text}"
        </div>
        <div className="flex flex-wrap px-[77px] justify-center gap-[28px]">
          {products?.length != 0 ? (
            products?.map((p, i) => <ProductCard key={i} cardDetail={p} />)
          ) : (
            <div className="flex flex-col gap-4 py-14 text-gray-600 items-center">
              <div className="text-2xl">Search No Result</div>
              <div>
                We're sorry. We cannot find any matches for your search term.
              </div>
              <SearchIcon size={80} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
