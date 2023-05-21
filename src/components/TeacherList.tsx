import { Teacher } from "@prisma/client";
import Error from "./Error";
import SpinnerPage from "./SpinnerPage";
import { TeacherCard } from "./TeacherCard";
import { api } from "~/utils/api";

export const TeacherList: React.FC = () => {
  const { data, isLoading, refetch, isSuccess, error } =
    api.teacher.getAll.useQuery(undefined, {
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
        {teachers.map((teacher: Teacher) => (
          <TeacherCard
            fullName={teacher.fullName}
            id={teacher.id}
            job={teacher.job}
          />
        ))}
      </>
    );
  }
};
