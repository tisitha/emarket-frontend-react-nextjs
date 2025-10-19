"use client";

import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";
import { Spinner } from "./ui/spinner";

const RefreshButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      aria-label="RefreshButton"
    >
      {isPending ? <Spinner /> : <RotateCw />}
    </Button>
  );
};

export default RefreshButton;
