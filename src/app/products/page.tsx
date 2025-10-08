import FilterTab from "@/components/FilterTab";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCardsView from "@/components/ProductCardsView";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { apiFetch } from "@/lib/apiClient.server";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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

  const currentSort =
    sortBy == "name"
      ? dir == "asc"
        ? "Alphabetically, A-Z"
        : "Alphabetically, Z-A"
      : dir == "asc"
      ? "Price, low to high"
      : "Price, high to low";

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

    vendorId: vendor === "null" ? null : vendor,

    minPrice: minprice == null ? null : Number(minprice),

    maxPrice: minprice == null ? null : Number(maxprice),

    stockOnly: stringToBoolean(stockonly),
  };

  const categories = await apiFetch<categoryType[]>(
    `/open/category/sub/${category}`
  );

  const rootCategories = await apiFetch<categoryType[]>(`/open/category/root`);

  const provinces = await apiFetch<provinceType[]>(`/open/province`);

  const warranties = await apiFetch<warrantyType[]>(`/open/warranty`);

  const products = await apiFetch<productResponseType>(`/open/product`, {
    method: "POST",
    body: getProductDto,
  });

  return (
    <>
      <Header />
      <div className=" bg-gray-100 flex justify-center">
        <div className="flex flex-col items-center max-w-[1360px] w-full">
          <div className="flex px-20 py-3 w-full">
            <details className="dropdown">
              <summary className="m-1 font-bold text-blue-950 hover:cursor-pointer">
                Categories
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {rootCategories?.map((c, i) => (
                  <li key={i}>
                    <Link href={`/products?category=${c.id}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
          <div className="flex max-w-[1360px] w-full ">
            <div className="max-w-[400px] w-full pl-30 pr-15 ">
              <div className="font-semibold">Sub Categories</div>
              {categories &&
                categories.map((c, i) => (
                  <Link
                    className="text-gray-700 hover:text-shadow-blue-600"
                    key={i}
                    href={`/products?category=${c.id}`}
                  >
                    {c.name}
                  </Link>
                ))}

              <FilterTab
                provinces={provinces}
                warranties={warranties}
                currentCategory={Number(category)}
                currentVendor={null}
                pagenumber={Number(pagenumber)}
                sortBy={String(sortBy)}
                dir={String(dir)}
              />
            </div>
            <div className="max-w-[990px] w-full">
              <div className="flex justify-end pr-40 pb-10">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    className="m-1 font-normal hover:cursor-pointer "
                  >
                    {currentSort} ▼
                  </div>
                  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <Link
                        href={`/products?pagenumber=${Number(
                          pagenumber
                        )}&sortBy=${"name"}&dir=${"asc"}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                      >
                        Alphabetically, A-Z
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/products?pagenumber=${Number(
                          pagenumber
                        )}&sortBy=${"name"}&dir=${"desc"}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                      >
                        Alphabetically, Z-A
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/products?pagenumber=${Number(
                          pagenumber
                        )}&sortBy=${"price"}&dir=${"asc"}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                      >
                        Price, low to high
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/products?pagenumber=${Number(
                          pagenumber
                        )}&sortBy=${"price"}&dir=${"desc"}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                      >
                        Price, high to low
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {products && (
                <ProductCardsView products={products.productResponseDtoList} />
              )}
              <div className="py-15">
                <Pagination>
                  <PaginationContent>
                    {pagenumber == 0 ? (
                      <PaginationItem>
                        <div className="text-gray-600 font-medium text-sm items-center flex gap-1 px-2.5 sm:pl-2.5 hover:cursor-default">
                          <ChevronLeftIcon size="15" />
                          <span className="hidden sm:block">Previous</span>
                        </div>
                      </PaginationItem>
                    ) : (
                      <PaginationItem>
                        <PaginationPrevious
                          href={`/products?pagenumber=${
                            Number(pagenumber) - 1
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        />
                      </PaginationItem>
                    )}
                    {Number(pagenumber) - 3 > 0 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    {Number(pagenumber) > 2 && (
                      <PaginationItem>
                        <PaginationLink
                          href={`/products?pagenumber=${
                            Number(pagenumber) - 3
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        >
                          {Number(pagenumber) - 2}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {Number(pagenumber) > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          href={`/products?pagenumber=${
                            Number(pagenumber) - 2
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        >
                          {Number(pagenumber) - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {Number(pagenumber) > 0 && (
                      <PaginationItem>
                        <PaginationLink
                          href={`/products?pagenumber=${
                            Number(pagenumber) - 1
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        >
                          {pagenumber}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        {Number(pagenumber) + 1}
                      </PaginationLink>
                    </PaginationItem>
                    {Number(pagenumber) + 1 < Number(products?.pageCount) && (
                      <PaginationItem>
                        <PaginationLink
                          href={`/products?pagenumber=${
                            Number(pagenumber) + 1
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        >
                          {Number(pagenumber) + 2}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {Number(pagenumber) + 2 < Number(products?.pageCount) && (
                      <PaginationItem>
                        <PaginationLink
                          href={`/products?pagenumber=${
                            Number(pagenumber) + 2
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        >
                          {Number(pagenumber) + 3}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {Number(pagenumber) + 3 < Number(products?.pageCount) && (
                      <PaginationItem>
                        <PaginationLink
                          href={`/products?pagenumber=${
                            Number(pagenumber) + 3
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        >
                          {Number(pagenumber) + 4}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    {Number(pagenumber) + 4 < Number(products?.pageCount) && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    {products?.isLast == true ? (
                      <PaginationItem>
                        <div className="text-gray-600 font-medium text-sm items-center flex gap-1 px-2.5 sm:pl-2.5 hover:cursor-default">
                          <span className="hidden sm:block">Next</span>
                          <ChevronRightIcon size="15" />
                        </div>
                      </PaginationItem>
                    ) : (
                      <PaginationItem>
                        <PaginationNext
                          href={`/products?pagenumber=${
                            Number(pagenumber) + 1
                          }&sortBy=${sortBy}&dir=${dir}&category=${category}&freedelivery=${freedelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${vendor}&minprice=${minprice}&maxprice=${maxprice}&stockonly=${stockonly}`}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
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
