import React from "react";
import Image from "next/image";
import Logo from "../../public/emarketLogo-l.png";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <div className="flex flex-col flex-1 w-full h-30 items-center justify-center bg-black">
      <div className="flex max-w-375 w-4/5 items-center font-bold gap-6 justify-between">
        <Link href={"/"}>
          <Image src={Logo} alt={"logo"} height={25} className="select-none" />
        </Link>
        <div className="not-md:hidden">
          <SearchBar />
        </div>
        <div className="flex text-white">
          <Link className="flex" href={""}>
            <User color="white" />
            Login
          </Link>
          <div> / </div>
          <Link href={""}>register</Link>
        </div>
        <Link className="not-md:hidden" href={""}>
          <ShoppingCart color="white" />
        </Link>
      </div>
      <div className="flex items-center gap-6 mt-6 md:hidden">
        <SearchBar />
        <Link href={""}>
          <ShoppingCart color="white" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
