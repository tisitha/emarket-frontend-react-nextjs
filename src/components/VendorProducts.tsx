import CustomPagination from "@/components/CustomPagination";
import { apiFetch } from "@/lib/apiClient.server";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import AddProduct from "./AddProduct";
import SortByButton from "./SortByButton";
import Image from "next/image";
import DeleteItem from "./DeleteItem";
import RefreshButton from "./RefreshButton";

type Props = {
  pagenumber: number;
  prefix: string;
  postfix: string;
  vendor?: string;
  sortBy: string;
  dir: string;
  options: sortOptionType[];
  token: string;
};

const VendorProducts = async ({
  pagenumber = 0,
  prefix,
  postfix,
  vendor,
  sortBy,
  dir,
  options,
  token,
}: Props) => {
  const getProductDto = {
    pageNumber: Number(pagenumber),

    pageSize: 10,

    sortBy: sortBy,

    dir: dir,

    categoryId: null,

    freeDelivery: false,

    cod: false,

    provinceIds: [],

    warrantyIds: [],

    minPrice: null,

    maxPrice: null,

    stockOnly: false,
  };

  const products = await apiFetch<productResponseType>(
    `/open/product/vendor/${vendor}`,
    {
      method: "POST",
      body: getProductDto,
    }
  );

  const categories = await apiFetch<categoryType[]>(`/open/category`, {
    mode: "revalidate",
  });

  const provinces = await apiFetch<provinceType[]>(`/open/province`, {
    mode: "revalidate",
    revalidateSeconds: 18000,
  });

  const warranties = await apiFetch<warrantyType[]>(`/open/warranty`, {
    mode: "revalidate",
    revalidateSeconds: 18000,
  });

  return (
    <div className="flex flex-col items-center max-w-[1360px] w-full">
      <div className="flex max-w-[1360px] w-full not-md:flex-wrap">
        <div className="max-w-[900px] w-full">
          <div className="flex justify-between mb-7">
            <div className="flex gap-3">
              <AddProduct
                categories={categories}
                provinces={provinces}
                warranties={warranties}
                token={token}
              />
              <RefreshButton />
            </div>
            <div>
              <SortByButton options={options} id={"sortBy"} />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Warrenty</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>Cod</TableHead>
                <TableHead>Delivery free</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Deal</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.productResponseDtoList.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Image
                      height={20}
                      width={20}
                      src={p.imgUrl}
                      alt={p.name}
                      style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.brand}</TableCell>
                  <TableCell>{p.category.name}</TableCell>
                  <TableCell>{p.warranty.name}</TableCell>
                  <TableCell>{p.province.name}</TableCell>
                  <TableCell>{p.cod}</TableCell>
                  <TableCell>{p.freeDelivery}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell>{p.deal}</TableCell>
                  <TableCell>{p.quantity}</TableCell>
                  <TableCell>
                    <AddProduct
                      token={token}
                      product={p}
                      categories={categories}
                      provinces={provinces}
                      warranties={warranties}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteItem url={`/product/${p.id}`} token={token} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="py-15">
            <CustomPagination
              pageNumber={Number(pagenumber)}
              isLast={Boolean(products?.isLast)}
              pageCount={Number(products?.pageCount)}
              prefix={prefix}
              postfix={postfix}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
