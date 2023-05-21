import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../utils/api";
import Layout from "../../components/Layout";
import SpinnerPage from "../../components/SpinnerPage";
import Link from "next/link";
import Error from "../../components/Error";
import { Teacher } from "@prisma/client";
import { LessonCard } from "~/components/LessonCard";
import { LessonList } from "~/components/LessonList";

const CardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading,
    error, // @ts-ignore
  } = api.teacher.getById.useQuery({ id: id });

  // if (!card) {
  //   return <SpinnerPage />;
  // } else if (isLoading) {
  //   return <SpinnerPage />;
  // } else if (error) {
  //   return <Error error={error.message} />;
  // }

  // const imageSourcesArray: string[] = card.imageSources.split(",");
  if (isLoading || !data) {
    return <SpinnerPage />;
  } else if (error || !id || typeof id === "object") {
    return (
      <>
        {error && <Error error={error.toString()} />}
        <Error error="undefined error" />
      </>
    );
  } else {
    const teacher: Teacher = data;
    return (
      <Layout>
        <>
          <h1 className="mb-8 text-2xl font-bold">{teacher.fullName}</h1>
          <LessonList id={id} />
        </>
      </Layout>
    );
  }
};

const Lessons: React.FC = () => {
  return <div className="flex w-full flex-col gap-4"></div>;
};

export default CardPage;
