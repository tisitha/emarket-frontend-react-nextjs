"use client";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Spinner } from "./ui/spinner";
import { apiFetchClient } from "@/lib/apiClient.client";

type Props = {
  product?: productType;
  categories?: categoryType[];
  provinces?: provinceType[];
  warranties?: warrantyType[];
  token: string;
};

const AddProduct = ({
  product,
  categories,
  provinces,
  warranties,
  token,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const jsonObject = Object.fromEntries(formData.entries());

      const newJsonObject = {
        ...jsonObject,
        price: jsonObject.price == "" ? null : Number(jsonObject.price),
        deal: jsonObject.deal == "" ? null : Number(jsonObject.deal),
        cod: jsonObject.cod == "true" ? true : false,
        freeDelivery: jsonObject.freeDelivery == "true" ? true : false,
        categoryId: Number(jsonObject.categoryId),
        provinceId: Number(jsonObject.provinceId),
        warrantyId: Number(jsonObject.warrantyId),
        quantity:
          jsonObject.quantity == "" ? null : Number(jsonObject.quantity),
      };

      const url = product ? `/product/${product.id}` : "/product";

      const inputFormData = new FormData();
      inputFormData.append("productRequestDto", JSON.stringify(newJsonObject));
      if (file) {
        inputFormData.append("file", file);
      } else if (!product) {
        toast.error("Image for product is required!");
      }

      const res = await apiFetchClient(url, {
        method: product ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: inputFormData,
        credentials: "include",
      });

      if (res) {
        toast("Saved!");
        if (!product) {
          (e.target as HTMLFormElement).reset();
        }
        router.refresh();
      } else {
        toast.error("Sorry, something went wrong! Please try again.");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{product ? "Edit" : "Add Product"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <ScrollArea className="h-dvh">
            <CardContent className="mt-7">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={product?.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    type="text"
                    name="brand"
                    defaultValue={product?.brand}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    name="price"
                    required
                    min={0}
                    defaultValue={product?.price}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deal">Deal</Label>
                  <Input
                    id="deal"
                    type="number"
                    name="deal"
                    min={0}
                    defaultValue={product?.deal}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deal">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    name="quantity"
                    min={0}
                    required
                    defaultValue={product?.quantity}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categoryId">Category</Label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    className="h-9 w-full min-w-0 outline rounded-sm px-2"
                    defaultValue={product?.category.id}
                  >
                    {categories?.map((p, i) => (
                      <option key={i} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cod">Cash On Delivey</Label>
                  <select
                    id="cod"
                    name="cod"
                    className="h-9 w-full min-w-0 outline rounded-sm px-2"
                    defaultValue={product?.cod ? "true" : "false"}
                  >
                    <option value={"true"}>Yes</option>
                    <option value={"false"}>No</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="freeDelivery">Free Delivey</Label>
                  <select
                    id="freeDelivery"
                    name="freeDelivery"
                    className=" h-9 w-full min-w-0 outline rounded-sm px-2"
                    defaultValue={product?.freeDelivery ? "true" : "false"}
                  >
                    <option value={"true"}>Yes</option>
                    <option value={"false"}>No</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="warrantyId">Warranty</Label>
                  <select
                    id="warrantyId"
                    name="warrantyId"
                    className="h-9 w-full min-w-0 outline rounded-sm px-2"
                    defaultValue={product?.warranty.id}
                  >
                    {warranties?.map((w, i) => (
                      <option key={i} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="provinceId">Province</Label>
                  <select
                    id="provinceId"
                    name="provinceId"
                    className="h-9 w-full min-w-0 outline rounded-sm px-2"
                    defaultValue={product?.province.id}
                  >
                    {provinces?.map((p, i) => (
                      <option key={i} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    className="outline rounded-sm px-2"
                    id="description"
                    name="description"
                    defaultValue={product?.description}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Image</Label>
                  <Input
                    onChange={handleSelectFile}
                    type="file"
                    className="file-input"
                    accept="image/jpeg, image/png, image/webp"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full hover:cursor-pointer"
                aria-label="Save"
              >
                {isPending ? <Spinner /> : product ? "Save" : "Add"}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full hover:cursor-pointer mt-3 mb-15"
                >
                  Cancel
                </Button>
              </DialogClose>
            </CardFooter>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
