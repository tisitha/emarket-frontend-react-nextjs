"use client";

import { apiFetchClient } from "@/lib/apiClient.client";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";

const CommandSearchBar = () => {
  const [toggleSearchContent, setToggleSearchContent] = useState(false);

  const checkFocus = () => {
    setToggleSearchContent(true);
  };

  const checkBlur = () => {
    setTimeout(() => {
      setToggleSearchContent(false);
    }, 300);
  };

  const [searchList, setSearchList] = useState<productType[]>([]);

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim() != "") {
      const res = await apiFetchClient<productType[]>(
        `/open/search/${searchTerm.trim()}/10`
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

  return (
    <div className="font-normal">
      <div className="flex flex-1 rounded-lg border shadow-md min-w-[250px] md:min-w-[450px] bg-white">
        <input
          name="search"
          className="w-full pl-4 focus:outline-none"
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={checkFocus}
          onBlur={checkBlur}
          placeholder="What are you looking for..."
        />
        <SearchIcon className="p-2 opacity-80 hover:cursor-pointer h-9 w-9 right-0" />
      </div>
      {toggleSearchContent && searchList.length > 0 && (
        <div className="absolute rounded-lg border shadow-md min-w-[250px] md:min-w-[450px] z-1 bg-white">
          {searchList.map((item, key) => (
            <div
              key={key}
              className="pl-4 p-1 hover:bg-gray-200 hover:rounded-lg  hover:cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandSearchBar;
