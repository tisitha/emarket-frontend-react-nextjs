import { apiFetch } from "@/lib/apiClient.server";
import Link from "next/link";
import React from "react";

type categoryType = {
  id: number;
  name: string;
};

const CategoryTab = async () => {
  const categories = await apiFetch<categoryType[]>(`/open/category/root`);

  return (
    <div className="max-w-[1366px]">
      <div className="bg-none font-bold text-2xl p-[77px] pb-[30px] ">
        Categories
      </div>
      <div className="flex flex-wrap px-[77px] bg-gray-100 gap-[20px]">
        {categories &&
          categories.map((category, key) => (
            <Link
              href={`/products?category=${category.id}`}
              className="rounded-2xl p-1 pl-3 pr-3 font-medium bg-white outline-1"
              key={key}
            >
              {category.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryTab;
