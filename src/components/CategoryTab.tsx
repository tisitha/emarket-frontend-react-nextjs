import Link from "next/link";
import React from "react";

type categoryType = {
  id: number;
  name: string;
};

const CategoryTab = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = await fetch(`${apiUrl}/open/category/root`);
  const categories: categoryType[] = await data.json();

  return (
    <div className="max-w-[1366px]">
      <div className="bg-none font-bold text-2xl p-[77px] pb-[30px] ">
        Categories
      </div>
      <div className="flex flex-wrap px-[77px] bg-gray-100 gap-[20px]">
        {categories.map((category, key) => (
          <Link
            href={""}
            className="rounded-4xl p-1 pl-3 pr-3 font-medium bg-white outline-1"
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
