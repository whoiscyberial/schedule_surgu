import { NextPage } from "next";
import Head from "next/head";
import Layout from "~/components/Layout";
import { TeacherList } from "~/components/TeacherList";

const Admin: NextPage = () => {
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
          <h1 className="text-2xl font-extrabold">Админ панель</h1>
        </div>
      </Layout>
    </>
  );
};

export default Admin;
