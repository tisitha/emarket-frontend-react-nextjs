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
  currentCategory: number | null;
  currentVendor: string | null;
  pagenumber: number;
  sortBy: string;
  dir: string;
};

const FilterTab = ({
  warranties = [],
  provinces = [],
  currentCategory,
  currentVendor,
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

  const handleMinPriceChange = (event: any) => {
    if (event.target.value == "") {
      setMinPrice(null);
    } else {
      if (event.target.value < 0) {
        setMinPrice(0);
      } else if (event.target.value > 9999999) {
        setMinPrice(9999999);
      } else {
        setMinPrice(event.target.value);
      }
    }
  };

  const handleMaxPriceChange = (event: any) => {
    if (event.target.value == "") {
      setMaxPrice(null);
    } else {
      if (event.target.value < 0) {
        setMaxPrice(0);
      } else if (event.target.value > 9999999) {
        setMaxPrice(9999999);
      } else {
        setMaxPrice(event.target.value);
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
    <div className="max-w-[310px] w-full flex flex-col gap-2 pb-10 mt-5">
      <hr />
      <Link
        className="pb-2"
        href={`/products?pagenumber=${pagenumber}&sortBy=${sortBy}&dir=${dir}&category=${currentCategory}&freedelivery=${freeDelivery}&cod=${cod}&province=${province}&warranty=${warranty}&vendor=${currentVendor}&minprice=${minPrice}&maxprice=${maxPrice}&stockonly=${stock}`}
      >
        <Button className="w-full hover:cursor-pointer">Apply Filter</Button>
      </Link>
      <div>
        <div className="font-semibold">Price</div>
        <div className="flex"></div>
        <Input
          placeholder="Min"
          onChange={handleMinPriceChange}
          value={minPrice ? minPrice : ""}
          type="number"
          min="0"
          max="9999999"
          className="w-25 h-8"
        />
        -
        <Input
          placeholder="Max"
          onChange={handleMaxPriceChange}
          value={maxPrice ? maxPrice : ""}
          type="number"
          min="0"
          max="9999999"
          className="w-25 h-8"
        />
      </div>
      <br />
      <div className="flex gap-6">
        <Checkbox
          id="stock"
          checked={stock}
          onCheckedChange={handleStockChange}
        />
        <Label htmlFor="stock">In Stock Only</Label>
      </div>
      <div className="flex gap-6">
        <Checkbox
          id="freedelivery"
          checked={freeDelivery}
          onCheckedChange={handleFreeDeliveryChange}
        />
        <Label htmlFor="freedelivery">Free Delivery Only</Label>
      </div>
      <div className="flex gap-6">
        <Checkbox id="cod" checked={cod} onCheckedChange={handleCodChange} />
        <Label htmlFor="cod">Cash On Delivery Only</Label>
      </div>
      <br />
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Shipped From</div>
        {provinces.map((p, i) => (
          <div key={i} className="flex gap-6">
            <Checkbox
              id={`province${i}`}
              onCheckedChange={(e) => handleProvinceChange(p.id, e)}
            />
            <Label
              htmlFor={`province${i}`}
              className="font-normal text-gray-900"
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
              onCheckedChange={(e) => handleWarrantyChange(w.id, e)}
            />
            <Label
              htmlFor={`warranty${i}`}
              className="font-normal text-gray-900"
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
