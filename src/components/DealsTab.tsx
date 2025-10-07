import React from "react";
import ProductCard from "./ProductCard";
import { apiFetch } from "@/lib/apiClient.server";

type cardDetailType = {
  id: number;
  imgUrl: string;
  name: string;
  price: number | null;
  deal: number | null;
  category: {
    id: number;
    name: string;
  };
};

const DealsTab = async () => {
  const cards = await apiFetch<cardDetailType[]>(`/open/product/deals/18`);

  return (
    <div className="max-w-[1366px] pb-[70px]">
      <div className="bg-none font-bold text-2xl p-[77px] pb-[30px]">
        Best Deals
      </div>
      <div className="flex flex-wrap px-[77px] bg-gray-100 gap-[28px]">
        {cards &&
          cards.map((card: cardDetailType, key: number) => (
            <ProductCard key={key} cardDetail={card} />
          ))}
      </div>
    </div>
  );
};

export default DealsTab;
