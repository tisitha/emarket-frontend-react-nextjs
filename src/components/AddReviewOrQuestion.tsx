"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { apiFetchClient } from "@/lib/apiClient.client";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

type Props = {
  review: boolean;
  token: string;
  productId: string;
};

const AddReviewOrQuestion = ({ review, token, productId }: Props) => {
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    startTransaction(async () => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const rawData = Object.fromEntries(formData.entries());

      if (review) {
        const data = {
          ...rawData,
          productId: productId,
          rate: Number(rawData.rate),
        };
        const res = await apiFetchClient(`/review`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        if (res) {
          toast.success("Added successfully");
          e.currentTarget.reset();
          router.refresh();
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const data = {
          productId: productId,
          question: rawData.body,
        };
        const res = await apiFetchClient(`/question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        if (res) {
          toast.success("Your question was sent to vendor");
          e.currentTarget.reset();
        } else {
          toast.error("Something went wrong");
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <textarea
        id="body"
        name="body"
        className="bg-white max-w-200 w-full h-30 outline rounded-2xl p-2"
        required
      />
      {review && (
        <div className="rating">
          <input
            type="radio"
            name="rate"
            value={1}
            className="mask mask-star"
            aria-label="1 star"
          />
          <input
            type="radio"
            name="rate"
            value={2}
            className="mask mask-star"
            aria-label="2 star"
          />
          <input
            type="radio"
            name="rate"
            value={3}
            className="mask mask-star"
            aria-label="3 star"
          />
          <input
            type="radio"
            name="rate"
            value={4}
            className="mask mask-star"
            aria-label="4 star"
          />
          <input
            type="radio"
            name="rate"
            value={5}
            className="mask mask-star"
            aria-label="5 star"
            defaultChecked
          />
        </div>
      )}
      <Button
        disabled={isPending}
        type="submit"
        className="w-30"
        aria-label="submit"
      >
        {isPending ? <Spinner /> : review ? "Add Review" : "Ask Question"}
      </Button>
    </form>
  );
};

export default AddReviewOrQuestion;
