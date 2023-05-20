import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../utils/api";
import Layout from "../../components/Layout";
import SpinnerPage from "../../components/SpinnerPage";
import Link from "next/link";
import Error from "../../components/Error";

const CardPage = () => {
  // const [open, setOpen] = useState(false);
  // const router = useRouter();
  // const { id } = router.query;

  // const {
  //   data: card,
  //   isLoading,
  //   error, // @ts-ignore
  // } = api.card.getById.useQuery({ id: id });

  // if (!card) {
  //   return <SpinnerPage />;
  // } else if (isLoading) {
  //   return <SpinnerPage />;
  // } else if (error) {
  //   return <Error error={error.message} />;
  // }

  // const imageSourcesArray: string[] = card.imageSources.split(",");

  return (
    <>
      <Layout>
        <>
          <h1 className="mb-8 text-2xl font-bold">
            Щипицин Константин Павлович
          </h1>
          <Lessons />
        </>
      </Layout>
    </>
  );
};

const Lessons: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <LessonCard />
      <LessonCard />
      <LessonCard />
      <LessonCard />
    </div>
  );
};

const LessonCard: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-200 bg-slate-50 px-10 py-8 transition-all">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Высшая математика
        </h3>
        <h4 className="text-slate-400">Лекция</h4>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-16 text-slate-600">
          <p>09:45 — 11:05</p>
          <p>У607</p>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
