"use client";

import Link from "next/link";

const UserDropdownMenu = ({ name }: { name: string }) => {
  return (
    <details className="dropdown">
      <summary className="btn m-1 rounded-3xl">Hello {name}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li>
          <Link href={""}>Dashboard</Link>
        </li>
        <li>
          <Link href={""}>Edit Account</Link>
        </li>
        <li>
          <Link href={""}>Logout</Link>
        </li>
      </ul>
    </details>
  );
};

export default UserDropdownMenu;
