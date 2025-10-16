"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { apiFetchClient } from "@/lib/apiClient.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  url: string;
  token: string;
};

const DeleteItem = ({ url, token }: Props) => {
  const [isPending, startTransitionn] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransitionn(async () => {
      const res = await apiFetchClient(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res) {
        toast("Deleted!");
        router.refresh();
      } else {
        toast.error("Sorry, something went wrong! Please try again.");
      }
    });
  };

  return (
    <Button disabled={isPending} onClick={handleDelete}>
      🗑
    </Button>
  );
};

export default DeleteItem;
