import React from "react";
import Image from "next/image";
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
          <Image src="/blacklogo.png" alt="logo" height={32} width={64} />
        </Link>
        <VKAuth />
      </header>
    );
  }

  return (
    <header className=" bg-white">
      <div className="flex items-center justify-between p-4">
        <Link href={"/"}>
          <Image src="/blacklogo.png" alt="logo" height={32} width={64} />
        </Link>
        <DropdownMenu session={session} />
      </div>
    </header>
  );
};

export default Header;
