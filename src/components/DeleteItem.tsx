"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { apiFetchClient } from "@/lib/apiClient.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

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
      {isPending ? <Spinner /> : "🗑"}
    </Button>
  );
};

export default DeleteItem;
