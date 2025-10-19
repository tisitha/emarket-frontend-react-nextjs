"use client";

import { apiFetchClient } from "@/lib/apiClient.client";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const CommandSearchBar = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggleSearchContent, setToggleSearchContent] = useState(false);
  const [text, setText] = useState("");
  const [searchList, setSearchList] = useState<productType[]>([]);

  const checkFocus = () => {
    setToggleSearchContent(true);
  };

  const checkBlur = () => {
    setTimeout(() => {
      setToggleSearchContent(false);
    }, 300);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setText(searchTerm.trim());
    if (searchTerm.trim() != "") {
      const encoded = encodeURIComponent(searchTerm.trim());
      const res = await apiFetchClient<productType[]>(
        `/open/search?text=${encoded}&size=10`
      );
      if (res) {
        if (res != true) {
          setSearchList(res);
        }
      }
    } else {
      setSearchList([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text != "") {
      e.preventDefault();
      router.push(`/catalog?text=${text.trim()}`);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <div className="relative font-normal w-full">
      <div className="flex flex-1 rounded-lg border shadow-md bg-white">
        <input
          name="search"
          className="w-full rounded-lg pl-4 focus:outline-none"
          ref={inputRef}
          onChange={handleChange}
          onFocus={checkFocus}
          onBlur={checkBlur}
          onKeyDown={handleKeyDown}
          maxLength={255}
          placeholder="What are you looking for..."
        />
        <Link
          href={text != "" ? `/catalog?text=${text.trim()}` : "#"}
          aria-label="Search"
        >
          <SearchIcon className="p-2 opacity-80 hover:cursor-pointer h-9 w-9 right-0" />
        </Link>
      </div>
      {toggleSearchContent && searchList.length > 0 && (
        <div className="absolute rounded-lg border w-full shadow-md z-2 bg-white">
          {searchList.map((p, i) => (
            <Link
              href={`/product?id=${p.id}`}
              key={i}
              className="pl-4 p-1 hover:bg-gray-200 hover:rounded-lg line-clamp-1 hover:cursor-pointer"
            >
              {p.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandSearchBar;
