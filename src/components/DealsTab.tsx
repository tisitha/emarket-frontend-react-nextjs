import React from "react";
import ProductCard from "./ProductCard";

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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = await fetch(`${apiUrl}/open/product/deals/18`);
  const cards: cardDetailType[] = await data.json();

  return (
    <div className="max-w-[1366px] pb-[70px]">
      <div className="bg-none font-bold text-2xl p-[77px] pb-[30px]">
        Best Deals
      </div>
      <div className="flex flex-wrap px-[77px] bg-gray-100 gap-[28px]">
        {cards.map((card: cardDetailType, key: number) => (
          <ProductCard key={key} cardDetail={card} />
        ))}
      </div>
    </div>
  );
};

export default DealsTab;
