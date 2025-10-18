"use client";

import React, { useState, useTransition } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { apiFetchClient } from "@/lib/apiClient.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

type Props = {
  title: string;
  placeholder?: any;
  defaultVal?: string;
  baseUrl: string;
  isSelect?: boolean;
  selectList?: genericType[];
  token: string;
  name: string;
};

type genericType = {
  id: number;
  name: string;
};

const DataEditBtn = ({
  title,
  placeholder,
  defaultVal,
  baseUrl,
  isSelect = false,
  selectList = [],
  token,
  name,
}: Props) => {
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState(placeholder);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentValue(e.target.value);
  };

  const handleClick = () => {
    startTransition(async () => {
      const data = {
        [name]: currentValue,
      };
      const res = await apiFetchClient(`${baseUrl}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res) {
        toast("Saved!");
        router.refresh();
      } else {
        toast.error("Sorry, something went wrong! Please try again.");
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger className="hover:bg-gray-200 active:bg-gray-200 rounded-2xl p-3 max-w-[600px] w-full">
        <div className="flex flex-col items-start font-medium ">
          <div>{title}</div>
          <div className="text-gray-800">
            {defaultVal ? defaultVal : placeholder}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2">
          {isSelect ? (
            <>
              <div>{title}</div>
              <select
                id={name}
                name={name}
                onChange={handleChange}
                defaultValue={placeholder}
                className="select h-9 w-full min-w-0 outline"
              >
                {selectList.map((o, i) => (
                  <option key={i} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <Label htmlFor="fname">{title}</Label>
              <Input
                id={name}
                name={name}
                value={currentValue}
                onChange={handleChange}
                required
              />
            </>
          )}
        </div>
        <Button
          disabled={isPending}
          className="mt-3 w-full"
          onClick={handleClick}
          aria-label="Save"
        >
          {isPending ? <Spinner /> : "Save"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default DataEditBtn;
