import { Lesson, Order, Teacher } from "@prisma/client";
import Error from "./Error";
import SpinnerPage from "./SpinnerPage";
import { TeacherCard } from "./TeacherCard";
import { api } from "~/utils/api";
import { LessonCard } from "./LessonCard";
import { orderToTime } from "~/utils/orderToTime";

type Props = {
  id: string;
};

export const LessonList = ({ id }: Props) => {
  const orderFetch = api.order.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { data, isLoading, refetch, isSuccess, error } =
    api.lesson.getAllByTeacherId.useQuery(
      { id: id },
      {
        refetchOnWindowFocus: false,
      }
    );

  if (isLoading || !data || orderFetch.isLoading || !orderFetch.data) {
    return <SpinnerPage />;
  } else if (error || orderFetch.error) {
    return (
      <>
        {error && <Error error={error.toString()} />}
        {orderFetch.error && <Error error={orderFetch.error.toString()} />}
      </>
    );
  } else {
    const lessons: Lesson[] = data;
    const orderList: Order[] = orderFetch.data;
    const order = orderToTime(orderList);

    let check = [];
    for (let i = 0; i < lessons.length; i++) {
      const elem = lessons[i];
      if (orderList.find((order) => order.order === elem?.order)) {
        check.push("good");
      } else {
        check.push("bad");
      }
    }
    if (check.includes("bad")) {
      return <Error error="Ошибка в расписании звонков"></Error>;
    }

    return (
      <>
        {lessons.map((lesson: Lesson) => (
          <LessonCard
            office={lesson.office}
            title={lesson.title}
            timeStart={
              // @ts-ignore
              orderList.find((order) => order.order === lesson.order).timeStart
            }
            timeEnd={
              //@ts-ignore
              orderList.find((order) => order.order === lesson.order).timeEnd
            }
            type={lesson.type}
          />
        ))}
      </>
    );
  }
};
