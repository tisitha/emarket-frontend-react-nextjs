"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  options: option[];
  id: string;
};

const SortByButton = ({ options, id }: Props) => {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(e.target.value, { scroll: false });
  };

  return (
    <select
      id={id}
      name={id}
      onChange={handleChange}
      className="select h-9 w-40 outline"
    >
      {options?.map((o, i) => (
        <option key={i} value={o.href}>
          {o.name}
        </option>
      ))}
    </select>
  );
};

export default SortByButton;
