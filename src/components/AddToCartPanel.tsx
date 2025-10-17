"use client";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { apiFetchClient } from "@/lib/apiClient.client";
import { Spinner } from "./ui/spinner";

type Props = {
  productId: string;
  stockQuantity: number;
  token?: string;
};

const AddToCartPanel = ({ productId, stockQuantity, token }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const [isPending, startTransaction] = useTransition();

  const handleSubmit = () => {
    startTransaction(async () => {
      const data = {
        quantity: quantity,
        productId: productId,
      };
      if (token) {
        const res = await apiFetchClient(`/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        if (res) {
          toast.success("Added to cart successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.warning("You must login to use cart");
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(e.target.value);
    if (value > stockQuantity) {
      setQuantity(stockQuantity);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  const handleAddBtn = () => {
    if (quantity != stockQuantity) {
      setQuantity((q) => q + 1);
    }
  };

  const handleSubBtn = () => {
    if (quantity !== 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>Quantity</div>
      <div>
        <Button onClick={handleSubBtn}>-</Button>
        <Input
          onChange={handleChange}
          id="quantity"
          name="quantity"
          type="number"
          value={quantity}
          className="w-12 text-center"
        />
        <Button onClick={handleAddBtn}>+</Button>
      </div>
      <div className="font-light">(Stock :{stockQuantity})</div>
      <Button
        disabled={isPending}
        onClick={handleSubmit}
        className="mt-5 w-35 hover:cursor-pointer"
      >
        {isPending ? <Spinner /> : <>Add to Cart</>}
      </Button>
    </div>
  );
};

export default AddToCartPanel;
