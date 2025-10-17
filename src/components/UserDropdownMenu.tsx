import Link from "next/link";
import Logout from "./Logout";

const UserDropdownMenu = ({ name }: { name: string }) => {
  return (
    <div className="dropdown">
      <div tabIndex={0} className="btn leading-none rounded-3xl">
        Hello {name}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/settings"}>Settings</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownMenu;
