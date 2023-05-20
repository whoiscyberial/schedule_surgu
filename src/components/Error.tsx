import Link from "next/link";
import React from "react";
import Layout from "./Layout";

type Props = {
  error: string;
};

const Error = ({ error }: Props) => {
  return (
    <Layout>
      <div className=" flex h-full flex-col items-center justify-center gap-2">
        <h1>{error}</h1>
        <h4>Возникла ошибочка..</h4>
        <Link href="/">
          <p className="mt-20 border-b border-slate-600 text-sm font-medium">
            Перейти на главную
          </p>
        </Link>
      </div>
    </Layout>
  );
};

export default Error;
