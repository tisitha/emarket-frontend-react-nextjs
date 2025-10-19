"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";

const RefreshButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.refresh()}>
      <RotateCw />
    </Button>
  );
};

export default RefreshButton;
