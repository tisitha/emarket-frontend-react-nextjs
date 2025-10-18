import React from "react";
import Image from "next/image";
import Logo from "../../public/emarketLogo-l.png";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { cookies } from "next/headers";
import UserDropdownMenu from "./UserDropdownMenu";
import Notification from "./Notification";

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const name = cookieStore.get("user_name")?.value;

  return (
    <div className="flex flex-col flex-1 w-full h-30 items-center justify-center bg-black">
      <div className="flex max-w-[1360px] w-full items-center font-bold gap-6 justify-evenly p-2">
        <Link href={"/"} aria-label="Home">
          <Image src={Logo} alt="Logo" height={25} className="select-none" />
        </Link>
        <div className="not-md:hidden w-full max-w-150">
          <SearchBar />
        </div>
        {name ? (
          <div>
            <UserDropdownMenu name={name} />
          </div>
        ) : (
          <div className="flex text-white font-semibold gap-1">
            <Link className="flex" href={"/account/login"}>
              <User color="white" className="pr-1" />
              Login
            </Link>
            <div>/</div>
            <Link href={"/account/register"}>register</Link>
          </div>
        )}
        {token && (
          <>
            <Notification userToken={token} />
            <Link href={"/cart"} aria-label="Cart">
              <ShoppingCart color="white" />
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center w-full p-2 md:hidden">
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
