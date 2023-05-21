import React from "react";
import Link from "next/link";
import VKAuth from "./VKAuth";
import { useSession } from "next-auth/react";
import DropdownMenu from "./UserDropdown";

const Header = () => {
  const session = useSession();
  const isAuth = session.status == "authenticated";
  if (!isAuth) {
    return (
      <header className="flex items-center justify-between">
        <Link href={"/"}>
          {/* <Image src="/blacklogo.png" alt="logo" height={32} width={64} /> */}
          <p className="text-lg font-bold tracking-tighter">
            find<span className="text-purple-600">your</span>teacher.
          </p>
        </Link>
        <VKAuth />
      </header>
    );
  }

  return (
    <header className="">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          {/* <Image src="/blacklogo.png" alt="logo" height={32} width={64} /> */}
          <p className="text-lg font-bold tracking-tighter">
            find<span className="text-purple-600">your</span>teacher.
          </p>
        </Link>
        <DropdownMenu session={session} />
      </div>
    </header>
  );
};

export default Header;
