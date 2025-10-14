import CustomPagination from "@/components/CustomPagination";
import FilterTab from "@/components/FilterTab";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCardsView from "@/components/ProductCardsView";
import SortByButton from "@/components/SortByButton";
import { apiFetch } from "@/lib/apiClient.server";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ProductsByFilters = async ({ searchParams }: Props) => {
  const {
    pagenumber = 0,

    sortBy = "name",

    dir = "asc",

    category = null,

    freedelivery = false,

    cod = false,

    province = [],

    warranty = [],

    vendor = null,

    minprice = null,

    maxprice = null,

    stockonly = false,
  } = await searchParams;

  const reviewSortOptions: sortOptionType[] = [
    {
      name: "Alphabetically, A-Z",
      href: `/products?pagenumber=${pagenumber}&sortBy=name&dir=asc&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`,
    },
    {
      name: "Alphabetically, Z-A",
      href: `/products?pagenumber=${pagenumber}&sortBy=name&dir=desc&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`,
    },
    {
      name: "Price, low to high",
      href: `/products?pagenumber=${pagenumber}&sortBy=price&dir=asc&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`,
    },
    {
      name: "Price, high to low",
      href: `/products?pagenumber=${pagenumber}&sortBy=price&dir=desc&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`,
    },
  ];

  const stringToArrayOfNumbers = (str: string | string[]) => {
    if (typeof str === "string") {
      if (str === "") {
        return [];
      }
      return str.split(",").map(Number);
    } else {
      return str;
    }
  };

  const stringToBoolean = (str: string | string[] | boolean) => {
    if (typeof str === "string") {
      const lowerStr = str.toLowerCase();
      if (lowerStr === "true") {
        return true;
      }
      if (lowerStr === "false") {
        return false;
      }
      return null;
    } else {
      return str;
    }
  };

  const getProductDto = {
    pageNumber: Number(pagenumber),

    pageSize: 8,

    sortBy: sortBy,

    dir: dir,

    categoryId: category,

    freeDelivery: stringToBoolean(freedelivery),

    cod: stringToBoolean(cod),

    provinceIds: stringToArrayOfNumbers(province),

    warrantyIds: stringToArrayOfNumbers(warranty),

    minPrice: minprice == null ? null : Number(minprice),

    maxPrice: minprice == null ? null : Number(maxprice),

    stockOnly: stringToBoolean(stockonly),
  };

  const categories =
    category &&
    category != "null" &&
    (await apiFetch<categoryType[]>(`/open/category/sub/${category}`));

  const rootCategories = await apiFetch<categoryType[]>(`/open/category/root`);

  const provinces = await apiFetch<provinceType[]>(`/open/province`);

  const warranties = await apiFetch<warrantyType[]>(`/open/warranty`);

  const products = await apiFetch<productResponseType>(
    `${
      vendor && vendor != "null"
        ? `/open/product/vendor/${vendor}`
        : "/open/product"
    }`,
    {
      method: "POST",
      body: getProductDto,
    }
  );

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1360px] w-full">
          <div className="flex px-20 py-3 w-full">
            <div className="dropdown">
              <div
                tabIndex={0}
                className="m-1 font-bold text-white hover:cursor-pointer outline rounded-2xl p-2 bg-blue-950 hover:bg-gray-700 active:bg-gray-700"
              >
                Categories ▾
              </div>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {rootCategories?.map((c, i) => (
                  <li key={i}>
                    <Link href={`/products?category=${c.id}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex max-w-[1360px] w-full not-md:flex-wrap">
            <div className="max-w-[400px] w-full pl-30 pr-15 ">
              {vendor && vendor != "null" ? (
                <div className="font-semibold">
                  {
                    products?.productResponseDtoList[0]?.vendorProfile
                      .businessName
                  }
                </div>
              ) : (
                <>
                  <div className="font-semibold">Sub Categories</div>
                  {categories &&
                    categories.map((c, i) => (
                      <Link
                        className="text-gray-700 hover:text-shadow-blue-600 hover:text-black"
                        key={i}
                        href={`/products?category=${c.id}`}
                      >
                        {c.name}
                      </Link>
                    ))}
                </>
              )}
              <FilterTab
                provinces={provinces}
                warranties={warranties}
                currentCategory={category ? String(category) : null}
                currentVendor={vendor ? String(vendor) : null}
                pagenumber={Number(pagenumber)}
                sortBy={String(sortBy)}
                dir={String(dir)}
              />
            </div>
            <div className="max-w-[900px] w-full">
              <div className="flex justify-end pr-40 pb-10">
                <SortByButton options={reviewSortOptions} id={"productSort"} />
              </div>
              {products && (
                <ProductCardsView products={products.productResponseDtoList} />
              )}
              <div className="py-15">
                <CustomPagination
                  pageNumber={Number(pagenumber)}
                  isLast={Boolean(products?.isLast)}
                  pageCount={Number(products?.pageCount)}
                  prefix={`/products?pagenumber=`}
                  postfix={`&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsByFilters;
