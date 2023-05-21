import Link from "next/link";
import React from "react";

type Props = {
  error: string;
};

const Error = ({ error }: Props) => {
  return (
    <div className=" flex h-[50vh] flex-col items-center justify-center gap-2">
      <h1>{error}</h1>
      <h4>Error</h4>
      <Link href="/">
        <p className="mt-20 border-b border-slate-600 text-sm font-medium">
          Перейти на главную
        </p>
      </Link>
    </div>
  );
};

export default Error;
