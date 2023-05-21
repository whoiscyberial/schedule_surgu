import { api } from "~/utils/api";

type Props = {
  title: string;
  type: string;
  timeStart: string;
  timeEnd: string;
  office: string;
  id: string;
  isAdmin: boolean;
  refetchFn: () => void;
};

export const LessonCard = ({
  title,
  type,
  timeStart,
  timeEnd,
  office,
  id,
  isAdmin,
  refetchFn,
}: Props) => {
  const deleteLesson = api.lesson.delete.useMutation();

  const onClickDelete = (id: string) => {
    deleteLesson.mutate({
      // @ts-ignore
      id: id,
    });
    setTimeout(() => {
      refetchFn();
    }, 500);
    return;
  };

  return (
    <div className="my-2 flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-200 bg-slate-50 px-10 py-8 transition-all">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <h4 className="text-slate-400">{type}</h4>
      </div>
      <div className="flex items-center gap-2 md:gap-8 lg:gap-40">
        <div className="flex items-center gap-10 text-slate-600 md:gap-16 lg:gap-28">
          <p className="font-medium">{office}</p>
          <p className="text-center">
            {timeStart} <br className="md:hidden" />{" "}
            <span className="hidden text-slate-400 md:inline">— </span>
            {timeEnd}
          </p>
        </div>
        {isAdmin && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-6 h-6 w-6 cursor-pointer text-slate-400 transition-all hover:text-slate-600"
            onClick={() => onClickDelete(id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
