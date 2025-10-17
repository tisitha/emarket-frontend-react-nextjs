"use client";
import React, { useTransition } from "react";
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
import { Spinner } from "./ui/spinner";
type Props = {
  orderId: string;
  token: string;
  version: "CANCEL" | "DELIVER" | "UPDATE";
};

const OrderStatusChangebtn = ({ orderId, token, version }: Props) => {
  const [isPending, startTransiction] = useTransition();
  const router = useRouter();

  const url =
    version == "DELIVER"
      ? "/admin/order/deliver/"
      : version == "UPDATE"
      ? "/order/update/"
      : "/order/cancel/";

  const handleClick = () => {
    startTransiction(async () => {
      const res = await apiFetchClient(`${url}${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog>
      {version == "DELIVER" ? (
        <div>
          <AlertDialogTrigger className="bg-green-700 hover:cursor-pointer text-sm text-white hover:bg-green-300 p-2 rounded-2xl">
            Mark As Delivered
          </AlertDialogTrigger>
        </div>
      ) : version == "UPDATE" ? (
        <div className="flex gap-2">
          <AlertDialogTrigger className="bg-green-700 hover:cursor-pointer text-sm text-white hover:bg-green-300 p-2 rounded-2xl">
            Update Order Status
          </AlertDialogTrigger>
          <AlertDialogTrigger className="bg-red-700 hover:cursor-pointer text-sm text-white hover:bg-red-300 p-2 rounded-2xl">
            Cancel The Order
          </AlertDialogTrigger>
        </div>
      ) : (
        <AlertDialogTrigger className="bg-red-700 hover:cursor-pointer text-sm text-white hover:bg-red-300 p-2 rounded-2xl">
          Cancel The Order
        </AlertDialogTrigger>
      )}
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
            {isPending ? <Spinner /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderStatusChangebtn;
