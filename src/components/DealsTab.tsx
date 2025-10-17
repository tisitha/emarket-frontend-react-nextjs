import React from "react";
import ProductCard from "./ProductCard";
import { apiFetch } from "@/lib/apiClient.server";

const DealsTab = async () => {
  const cards = await apiFetch<productType[]>(`/open/product/deals/18`);

  return (
    <div className="max-w-[1366px] pb-[70px]">
      <div className="bg-none font-bold text-2xl p-[77px] pb-[30px]">
        Best Deals
      </div>
      <div className="flex flex-wrap px-[77px] justify-center gap-[28px]">
        {cards && cards.map((p, i) => <ProductCard key={i} cardDetail={p} />)}
      </div>
    </div>
  );
};

export default DealsTab;
