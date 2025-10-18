"use client";

import React, { useTransition } from "react";
import { apiFetchClient } from "@/lib/apiClient.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

type Props = {
  token: string;
  cartItemId: string;
};

const DeleteCartItem = ({ token, cartItemId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    console.log(cartItemId + "----" + token);
    startTransition(async () => {
      const res = await apiFetchClient(`/cart/${cartItemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (res) {
        toast("Cart item deleted!");
        router.refresh();
      }
    });
  };
  return (
    <button
      className="block text-sm hover:text-gray-600 hover:cursor-pointer p-1"
      disabled={isPending}
      onClick={handleClick}
      aria-label="Remove"
    >
      {isPending ? <Spinner /> : "remove"}
    </button>
  );
};

export default DeleteCartItem;
