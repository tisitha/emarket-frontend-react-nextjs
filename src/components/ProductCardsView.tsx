import React from "react";
import ProductCard from "./ProductCard";

type Props = {
  products?: productType[];
};

const ProductCardsView = ({ products }: Props) => {
  return (
    <div className="flex flex-wrap px-[77px] bg-gray-100 gap-[20px] max-h-[4000px] max-w-[1024px]">
      {products &&
        products.map((p, i) => <ProductCard key={i} cardDetail={p} />)}
    </div>
  );
};

export default ProductCardsView;
