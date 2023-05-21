import type { Lesson, Order } from "@prisma/client";
import Error from "./Error";
import SpinnerPage from "./SpinnerPage";
import { api } from "~/utils/api";
import { LessonCard } from "./LessonCard";
import { Tab } from "@headlessui/react";

type Props = {
  id: string;
};

export const LessonList = ({ id }: Props) => {
  const orderFetch = api.order.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { data, isLoading, error } = api.lesson.getAllByTeacherId.useQuery(
    { teacherId: id },
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

    const check = [];
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
      <Tab.Group>
        <Tab.List>
          <DayTab text="Пн" />
          <DayTab text="Вт" />
          <DayTab text="Ср" />
          <DayTab text="Чт" />
          <DayTab text="Пт" />
          <DayTab text="Сб" />
        </Tab.List>
        <Tab.Panels className={"mt-4 w-full"}>
          <Tab.Panel>
            <LessonsByDay lessons={lessons} day={1} orderList={orderList} />
          </Tab.Panel>
          <Tab.Panel>
            <LessonsByDay lessons={lessons} day={2} orderList={orderList} />
          </Tab.Panel>
          <Tab.Panel>
            <LessonsByDay lessons={lessons} day={3} orderList={orderList} />
          </Tab.Panel>
          <Tab.Panel>
            <LessonsByDay lessons={lessons} day={4} orderList={orderList} />
          </Tab.Panel>
          <Tab.Panel>
            <LessonsByDay lessons={lessons} day={5} orderList={orderList} />
          </Tab.Panel>
          <Tab.Panel>
            <LessonsByDay lessons={lessons} day={6} orderList={orderList} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    );
  }
};

type LessonsByDayProps = {
  lessons: Lesson[];
  day: number;
  orderList: Order[];
};

const LessonsByDay = ({ lessons, day, orderList }: LessonsByDayProps) => {
  let lessonsFiltered: Lesson[] = [];
  for (let i = 0; i < lessons.length; i++) {
    const elem = lessons[i];
    if (elem?.day === day) {
      lessonsFiltered.push(elem);
    }
  }

  return (
    <>
      {lessonsFiltered.map((lesson: Lesson) => (
        <LessonCard
          key={lesson.id}
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
};

type DayTabProps = { text: string };
const DayTab = ({ text }: DayTabProps) => {
  return (
    <Tab
      className={
        "mx-3 rounded-lg border-2 border-slate-200 p-3 text-lg font-medium transition-all ui-selected:-translate-y-1 ui-selected:bg-slate-200 ui-selected:font-bold ui-selected:shadow-md"
      }
    >
      {text}
    </Tab>
  );
};
