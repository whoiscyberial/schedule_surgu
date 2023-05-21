type Props = {
  title: string;
  type: string;
  timeStart: string;
  timeEnd: string;
  office: string;
};

export const LessonCard = ({
  title,
  type,
  timeStart,
  timeEnd,
  office,
}: Props) => {
  return (
    <div className="flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-200 bg-slate-50 px-10 py-8 transition-all">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <h4 className="text-slate-400">{type}</h4>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-16 text-slate-600">
          <p>
            {timeStart} — {timeEnd}
          </p>
          <p>{office}</p>
        </div>
      </div>
    </div>
  );
};
