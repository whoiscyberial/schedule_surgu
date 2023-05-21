import type { Teacher } from "@prisma/client";
import Error from "./Error";
import SpinnerPage from "./SpinnerPage";
import { TeacherCard } from "./TeacherCard";
import { api } from "~/utils/api";
import { useState } from "react";
import AddTeacherModal from "./AddTeacherModal";
import { useSession } from "next-auth/react";

export const TeacherList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const isAdmin =
    session.status == "authenticated" && session.data?.user.role == "admin";
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error, refetch } = api.teacher.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !data) {
    return <SpinnerPage />;
  } else if (error) {
    return <Error error={error.toString()} />;
  } else {
    const teachers: Teacher[] = data;

    return (
      <>
        <AddTeacherModal open={open} setOpen={setOpen} refetchFn={refetch} />
        <div className="flex w-full gap-5">
          <input
            className="flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-400 px-10 py-5 placeholder-slate-400 focus-visible:text-slate-900"
            placeholder="Поиск по ФИО"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {isAdmin && (
            <>
              <button
                onClick={() => setOpen(true)}
                className="hidden w-1/3 items-center justify-between rounded-lg border-2 border-solid border-slate-400 px-7 py-5 transition-all hover:bg-slate-200 focus-visible:text-slate-900 md:flex"
              >
                <p className="w-full text-center font-medium text-slate-800 lg:line-clamp-1">
                  Добавить преподавателя
                </p>
              </button>
              <button
                onClick={() => setOpen(true)}
                className="w-1/5 items-center justify-between rounded-lg border-2 border-solid border-slate-400 px-7 py-5 transition-all hover:bg-slate-200 focus-visible:text-slate-900 md:hidden "
              >
                <p className="w-full text-center font-medium text-slate-800 lg:line-clamp-1">
                  +
                </p>
              </button>
            </>
          )}
        </div>
        <TeacherListFiltered
          isAdmin={isAdmin}
          refetchFn={refetch}
          search={searchValue}
          teachers={teachers}
        />
      </>
    );
  }
};

type TeacherListFiltered = {
  teachers: Teacher[];
  search: string;
  isAdmin: boolean;
  refetchFn: () => void;
};
const TeacherListFiltered = ({
  teachers,
  search,
  isAdmin,
  refetchFn,
}: TeacherListFiltered) => {
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
          isAdmin={isAdmin}
          refetchFn={refetchFn}
          key={teacher.id}
          fullName={teacher.fullName}
          id={teacher.id}
          job={teacher.job}
        />
      ))}
    </>
  );
};
