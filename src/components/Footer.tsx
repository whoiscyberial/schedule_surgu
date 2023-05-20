import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <p className="text-sm text-slate-400">with love</p>
      <Link
        href="https://vk.com/whoiscyberial"
        className="border-b border-transparent text-lg font-medium text-slate-600 transition-all duration-300 hover:border-b hover:border-slate-900 hover:text-slate-900"
      >
        cyberial
      </Link>
    </div>
  );
}

export default Footer;
