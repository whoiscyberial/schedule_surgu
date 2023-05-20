import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Layout from "~/components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Расписание</title>
        <meta
          name="description"
          content="Онлайн-расписание преподавателей СурГУ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex min-h-screen w-full flex-col items-center gap-5">
          <h1 className="text-2xl font-extrabold">Расписание преподавателей</h1>
          <Search />
          <TeacherCard />
          <TeacherCard />
          <TeacherCard />
        </div>
      </Layout>
    </>
  );
};

export default Home;

const Search: React.FC = () => {
  return (
    <input
      className="flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-400 px-10 py-5 placeholder-slate-400 focus-visible:text-slate-900"
      placeholder="Поиск по ФИО"
    />
  );
};

const TeacherCard: React.FC = () => {
  return (
    <Link
      href={"./teachers/1"}
      className="flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-200 bg-slate-50 p-10 transition-all hover:bg-slate-200 active:bg-slate-300"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Щипицин Константин Павлович
        </h3>
        <h4 className="text-slate-500">Канд. физ.-мат. наук, доцент</h4>
      </div>
      <p>{"-->"}</p>
    </Link>
  );
};
