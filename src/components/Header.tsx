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
  const role = cookieStore.get("user_role")?.value;
  const name = cookieStore.get("user_name")?.value;

  return (
    <div className="flex flex-col flex-1 w-full h-30 items-center justify-center bg-black">
      <div className="flex max-w-375 w-4/5 items-center font-bold gap-6 justify-between">
        <Link href={"/"}>
          <Image
            src={Logo}
            alt="/emarketLogo-l.svg"
            height={25}
            className="select-none"
          />
        </Link>
        <div className="not-md:hidden">
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
            <Link className="not-md:hidden" href={"/cart"}>
              <ShoppingCart color="white" />
            </Link>
            <Notification userToken={token} />
          </>
        )}
      </div>
      <div className="flex items-center gap-6 mt-6 md:hidden">
        <SearchBar />
        {token && (
          <Link href={"/cart"}>
            <ShoppingCart color="white" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
