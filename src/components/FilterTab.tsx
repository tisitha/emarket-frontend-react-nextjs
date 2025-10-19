"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  warranties?: warrantyType[];
  provinces?: provinceType[];
  currentCategory?: string | null;
  currentVendor?: string | null;
  pagenumber: number;
  sortBy: string;
  dir: string;
};

const FilterTab = ({
  warranties = [],
  provinces = [],
  currentCategory = null,
  currentVendor = null,
  pagenumber,
  sortBy,
  dir,
}: Props) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<boolean>(false);
  const [freeDelivery, setFreeDelivery] = useState<boolean>(false);
  const [cod, setCod] = useState<boolean>(false);
  const [province, setProvince] = useState<number[]>([]);
  const [warranty, setWarranty] = useState<number[]>([]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setMinPrice(null);
    } else {
      if (Number(event.target.value) < 0) {
        setMinPrice(0);
      } else if (Number(event.target.value) > 9999999) {
        setMinPrice(9999999);
      } else {
        setMinPrice(Number(event.target.value));
      }
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setMaxPrice(null);
    } else {
      if (Number(event.target.value) < 0) {
        setMaxPrice(0);
      } else if (Number(event.target.value) > 9999999) {
        setMaxPrice(9999999);
      } else {
        setMaxPrice(Number(event.target.value));
      }
    }
  };

  const handleStockChange = (event: boolean | "indeterminate") => {
    if (event != "indeterminate") {
      setStock(event);
    }
  };

  const handleFreeDeliveryChange = (event: boolean | "indeterminate") => {
    if (event != "indeterminate") {
      setFreeDelivery(event);
    }
  };

  const handleCodChange = (event: boolean | "indeterminate") => {
    if (event != "indeterminate") {
      setCod(event);
    }
  };

  const handleProvinceChange = (
    id: number,
    event: boolean | "indeterminate"
  ) => {
    if (event != "indeterminate") {
      if (event) {
        setProvince((p) => [...p, id]);
      } else {
        setProvince((p) => [...p.filter((i) => i != id)]);
      }
    }
  };

  const handleWarrantyChange = (
    id: number,
    event: boolean | "indeterminate"
  ) => {
    if (event != "indeterminate") {
      if (event) {
        setWarranty((w) => [...w, id]);
      } else {
        setWarranty((w) => [...w.filter((i) => i != id)]);
      }
    }
  };

  return (
    <div className="max-w-[240px] w-full flex flex-col gap-2 pb-10 mt-5 mx-auto ">
      <hr />
      <Button className="w-full hover:cursor-pointer mb-2" asChild>
        <Link
          href={`/products?pagenumber=${pagenumber}&sortBy=${sortBy}&dir=${dir}&category=${currentCategory}&freedelivery=${freeDelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${currentVendor}&minprice=${minPrice}&maxprice=${maxPrice}&stockonly=${stock}`}
        >
          Apply Filter
        </Link>
      </Button>
      <div>
        <div className="font-semibold">Price</div>
        <div className="flex"></div>
        <Input
          id="minPrice"
          placeholder="Min"
          onChange={handleMinPriceChange}
          value={minPrice ? minPrice : ""}
          type="number"
          min="0"
          max="9999999"
          maxLength={255}
          className="w-25 h-8 focus:bg-white"
        />
        -
        <Input
          id="maxPrice"
          placeholder="Max"
          onChange={handleMaxPriceChange}
          value={maxPrice ? maxPrice : ""}
          type="number"
          min="0"
          max="9999999"
          maxLength={255}
          className="w-25 h-8 focus:bg-white"
        />
      </div>
      <br />
      <div className="flex gap-6">
        <Checkbox
          id="stock"
          name="stock"
          checked={stock}
          onCheckedChange={handleStockChange}
          className="hover:cursor-pointer hover:bg-white"
        />
        <Label
          htmlFor="stock"
          className="hover:cursor-pointer hover:text-gray-600"
        >
          In Stock Only
        </Label>
      </div>
      <div className="flex gap-6">
        <Checkbox
          id="freedelivery"
          name="freedelivery"
          checked={freeDelivery}
          onCheckedChange={handleFreeDeliveryChange}
          className="hover:cursor-pointer hover:bg-white"
        />
        <Label
          htmlFor="freedelivery"
          className="hover:cursor-pointer hover:text-gray-600"
        >
          Free Delivery Only
        </Label>
      </div>
      <div className="flex gap-6">
        <Checkbox
          id="cod"
          name="cod"
          checked={cod}
          onCheckedChange={handleCodChange}
          className="hover:cursor-pointer hover:bg-white"
        />
        <Label
          htmlFor="cod"
          className="hover:cursor-pointer hover:text-gray-600"
        >
          Cash On Delivery Only
        </Label>
      </div>
      <br />
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Shipped From</div>
        {provinces.map((p, i) => (
          <div key={i} className="flex gap-6">
            <Checkbox
              id={`province${i}`}
              name={`province${i}`}
              onCheckedChange={(e) => handleProvinceChange(p.id, e)}
              className="hover:cursor-pointer hover:bg-white"
            />
            <Label
              htmlFor={`province${i}`}
              className="font-normal text-gray-900 hover:cursor-pointer hover:text-gray-600"
            >
              {p.name}
            </Label>
          </div>
        ))}
      </div>
      <br />
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Warranty Type</div>
        {warranties.map((w, i) => (
          <div key={i} className="flex gap-6">
            <Checkbox
              id={`warranty${i}`}
              name={`warranty${i}`}
              onCheckedChange={(e) => handleWarrantyChange(w.id, e)}
              className="hover:cursor-pointer hover:bg-white"
            />
            <Label
              htmlFor={`warranty${i}`}
              className="font-normal text-gray-900 hover:cursor-pointer hover:text-gray-600"
            >
              {w.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTab;
