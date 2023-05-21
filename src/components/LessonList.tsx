import type { Lesson, Order } from "@prisma/client";
import Error from "./Error";
import SpinnerPage from "./SpinnerPage";
import { api } from "~/utils/api";
import { LessonCard } from "./LessonCard";
import { Tab } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

type Props = {
  id: string;
};

export const LessonList = ({ id }: Props) => {
  const session = useSession();
  const isAdmin =
    session.status == "authenticated" && session.data?.user.role == "admin";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addNewLesson = api.lesson.add.useMutation();
  const onSubmit = (data: Record<string, object>) => {
    addNewLesson.mutate({
      // @ts-ignore
      title: data.title, // @ts-ignore
      teacherId: id, // @ts-ignore
      type: data.type, // @ts-ignore
      day: Number.parseInt(data.day, 10), // @ts-ignore
      order: Number.parseInt(data.order, 10), // @ts-ignore
      office: data.office, // @ts-ignore
    });
    setTimeout(() => {
      void refetch();
    }, 700);
    return;
  };

  const orderFetch = api.order.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { data, isLoading, error, refetch } =
    api.lesson.getAllByTeacherId.useQuery(
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
      <>
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
              <LessonsByDay
                refetchFn={refetch}
                lessons={lessons}
                day={1}
                orderList={orderList}
                isAdmin={isAdmin}
              />
            </Tab.Panel>
            <Tab.Panel>
              <LessonsByDay
                refetchFn={refetch}
                lessons={lessons}
                day={2}
                orderList={orderList}
                isAdmin={isAdmin}
              />
            </Tab.Panel>
            <Tab.Panel>
              <LessonsByDay
                refetchFn={refetch}
                lessons={lessons}
                day={3}
                orderList={orderList}
                isAdmin={isAdmin}
              />
            </Tab.Panel>
            <Tab.Panel>
              <LessonsByDay
                refetchFn={refetch}
                lessons={lessons}
                day={4}
                orderList={orderList}
                isAdmin={isAdmin}
              />
            </Tab.Panel>
            <Tab.Panel>
              <LessonsByDay
                refetchFn={refetch}
                lessons={lessons}
                day={5}
                orderList={orderList}
                isAdmin={isAdmin}
              />
            </Tab.Panel>
            <Tab.Panel>
              <LessonsByDay
                refetchFn={refetch}
                lessons={lessons}
                day={6}
                orderList={orderList}
                isAdmin={isAdmin}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {isAdmin && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 w-full space-y-4"
          >
            <h2 className="text-center text-lg font-bold">
              Добавить новую пару
            </h2>
            <input
              {...register("title", { required: true })}
              className={`w-full rounded-lg border-2 ${
                errors.title
                  ? "border-red-500 focus-visible:border-red-500"
                  : "border-slate-200"
              } w-full px-4 py-4 outline-none transition-all focus-visible:border-slate-500 focus-visible:shadow-md focus-visible:shadow-slate-200`}
              placeholder="Название пары"
            />
            <input
              {...register("type", { required: true })}
              className={`w-full rounded-lg border-2 ${
                errors.type
                  ? "border-red-500 focus-visible:border-red-500"
                  : "border-slate-200"
              } w-full px-4 py-4 outline-none transition-all focus-visible:border-slate-500 focus-visible:shadow-md focus-visible:shadow-slate-200`}
              placeholder="Назначение пары (Лекция\Практика\Экзамен\Консультация)"
            />
            <div className="flex gap-5">
              <select
                {...register("day", { required: true })}
                className="rounded-lg border-2 border-slate-200 px-3 py-3 focus-visible:outline-none md:px-5"
              >
                <option value="1" defaultChecked={true}>
                  Пн
                </option>
                <option value="2">Вт</option>
                <option value="3">Ср</option>
                <option value="4">Чт</option>
                <option value="5">Пт</option>
                <option value="6">Сб</option>
              </select>
              <select
                {...register("order", { required: true })}
                className="rounded-lg border-2 border-slate-200 px-2 py-3 focus-visible:outline-none md:px-5"
              >
                <option value="1" defaultChecked={true}>
                  1-ая пара
                </option>
                <option value="2">2-ая пара</option>
                <option value="3">3-я пара</option>
                <option value="4">4-ая пара</option>
                <option value="5">5-ая пара</option>
                <option value="6">6-ая пара</option>
                <option value="7">7-ая пара</option>
                <option value="8">8-ая пара</option>
                <option value="9">9-ая пара</option>
                <option value="10">10-ая пара</option>
              </select>
              <input
                {...register("office", { required: true })}
                className={`rounded-lg border-2 px-4 py-2 ${
                  errors.office
                    ? "border-red-500 focus-visible:border-red-500"
                    : "border-slate-200"
                } w-full px-4 py-4 outline-none transition-all focus-visible:border-slate-500 focus-visible:shadow-md focus-visible:shadow-slate-200`}
                placeholder="Кабинет"
              />
            </div>
            {(errors.title ||
              errors.type ||
              errors.day ||
              errors.order ||
              errors.office) && (
              <span className="inline-block rounded-lg  p-2 text-red-500">
                Пожалуйста, заполните все поля
              </span>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-800 px-4 py-4 font-medium text-white transition-all hover:bg-slate-900 "
            >
              Добавить
            </button>
          </form>
        )}
      </>
    );
  }
};

type LessonsByDayProps = {
  lessons: Lesson[];
  day: number;
  orderList: Order[];
  isAdmin: boolean;
  refetchFn: () => void;
};

const LessonsByDay = ({
  lessons,
  day,
  orderList,
  isAdmin,
  refetchFn,
}: LessonsByDayProps) => {
  const lessonsFiltered: Lesson[] = [];
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
          refetchFn={refetchFn}
          id={lesson.id}
          isAdmin={isAdmin}
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
        "mx-1 rounded-lg border-2 border-slate-200 p-3 text-lg font-medium transition-all ui-selected:-translate-y-1 ui-selected:bg-slate-200 ui-selected:font-bold md:mx-3 "
      }
    >
      {text}
    </Tab>
  );
};
