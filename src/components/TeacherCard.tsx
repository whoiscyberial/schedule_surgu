import { Teacher } from "@prisma/client";
import Link from "next/link";

type Props = {
  id: string;
  fullName: string;
  job: string | null;
};

export const TeacherCard = ({ id, fullName, job }: Props) => {
  return (
    <Link
      href={`./teachers/${id}`}
      className="flex w-full items-center justify-between rounded-lg border-2 border-solid border-slate-200 bg-slate-50 p-10 transition-all hover:bg-slate-200 active:bg-slate-300"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900">{fullName}</h3>
        {job && <h4 className="text-slate-500">{job}</h4>}
      </div>
      <p>{"-->"}</p>
    </Link>
  );
};
