"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { apiFetchClient } from "@/lib/apiClient.client";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

type Props = {
  paymentMethods?: paymentMethodType[];
  token: string;
  cod: boolean;
  disabled: boolean;
};

const CheckOut = ({ paymentMethods = [], token, cod, disabled }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const paymentMethodswithOutCod = paymentMethods.filter(
    (p) => p.name != "Cash On Delivery"
  );
  const [paymentMethodId, setPaymentId] = useState<number>();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentId(Number(e.target.value));
  };

  const handleSubmit = () => {
    startTransition(async () => {
      if (paymentMethodId == undefined) {
        toast.warning("Select a payment option");
        return;
      }
      const orderRequest = {
        paymentMethodId: paymentMethodId,
      };
      const res = await apiFetchClient(`/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderRequest),
        credentials: "include",
      });
      if (res) {
        toast.success("Placed your Order!");
        router.refresh();
      } else {
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">Payment method:</div>
        <select
          id="paymentMethod"
          name="paymentMethod"
          defaultValue="Select"
          onChange={handleChange}
          className="select h-9 w-40 outline"
        >
          <option disabled>Select</option>
          {cod
            ? paymentMethods?.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))
            : paymentMethodswithOutCod?.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
        </select>
      </div>
      <Button
        className="w-full mt-5 hover:cursor-pointer"
        onClick={handleSubmit}
        disabled={disabled || isPending}
      >
        {isPending ? <Spinner /> : "Checkout"}
      </Button>
    </div>
  );
};

export default CheckOut;
