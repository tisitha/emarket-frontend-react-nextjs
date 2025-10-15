"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { apiFetchClient } from "@/lib/apiClient.client";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
type Props = {
  orderId: string;
  token: string;
};

const OrderCancelBtn = ({ orderId, token }: Props) => {
  const [isPending, startTransiction] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransiction(async () => {
      const res = await apiFetchClient(`/order/cancel/${orderId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res) {
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-700 hover:cursor-pointer">
          Cancel Order
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderCancelBtn;
