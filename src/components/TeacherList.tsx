import type { Teacher } from "@prisma/client";
import Error from "./Error";
import SpinnerPage from "./SpinnerPage";
import { TeacherCard } from "./TeacherCard";
import { api } from "~/utils/api";
import { useState } from "react";

export const TeacherList: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = api.teacher.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (isLoading || !data) {
    return <SpinnerPage />;
  } else if (error) {
    return <Error error={error.toString()} />;
  } else {
    const teachers: Teacher[] = data;

    return (
      <>
        <input
          className="flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-400 px-10 py-5 placeholder-slate-400 focus-visible:text-slate-900"
          placeholder="Поиск по ФИО"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <TeacherListFiltered search={searchValue} teachers={teachers} />
      </>
    );
  }
};

type TeacherListFiltered = {
  teachers: Teacher[];
  search: string;
};
const TeacherListFiltered = ({ teachers, search }: TeacherListFiltered) => {
  const teachersFiltered: Teacher[] = [];
  for (let i = 0; i < teachers.length; i++) {
    const elem = teachers[i];
    if (elem?.fullName.toLowerCase().includes(search.toLowerCase())) {
      teachersFiltered.push(elem);
    }
  }

  return (
    <>
      {teachersFiltered.map((teacher: Teacher) => (
        <TeacherCard
          key={teacher.id}
          fullName={teacher.fullName}
          id={teacher.id}
          job={teacher.job}
        />
      ))}
    </>
  );
};
