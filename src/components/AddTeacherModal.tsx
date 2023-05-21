import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

type ModalVideo = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetchFn: () => void;
};

export default function ModalVideo({ open, setOpen, refetchFn }: ModalVideo) {
  const cancelButtonRef = useRef(null);
  const addNewTeacher = api.teacher.add.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Record<string, {}>) => {
    addNewTeacher.mutate({
      // @ts-ignore
      id: data.id, // @ts-ignore
      fullName: data.fullName, // @ts-ignore
      job: data.job, // @ts-ignore
      email: data.email, // @ts-ignore
      description: data.description, // @ts-ignore
    });
    setOpen(false);
    setTimeout(() => {
      refetchFn();
    }, 700);
    return;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white transition-opacity md:bg-gray-500 md:bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative my-auto max-h-screen w-full max-w-[45vh] transform overflow-hidden rounded-lg bg-white px-4  py-4 text-left transition-all md:max-w-[35vh] md:shadow-xl">
                <div className="aspect-w-9 aspect-h-16 mx-auto my-auto mt-2  max-w-md">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 w-full space-y-4"
                  >
                    <input
                      {...register("fullName", { required: true })}
                      className={`w-full rounded-lg border-2 ${
                        errors.fullName
                          ? "border-red-500 focus-visible:border-red-500"
                          : "border-slate-200"
                      } w-full px-4 py-4 outline-none transition-all focus-visible:border-slate-500 focus-visible:shadow-md focus-visible:shadow-slate-200`}
                      placeholder="Фамилия Имя Отчество"
                    />
                    <input
                      {...register("job", { required: false })}
                      className={`w-full rounded-lg border-2 ${
                        errors.job
                          ? "border-red-500 focus-visible:border-red-500"
                          : "border-slate-200"
                      } w-full px-4 py-4 outline-none transition-all focus-visible:border-slate-500 focus-visible:shadow-md focus-visible:shadow-slate-200`}
                      placeholder="Доцент\Старший преподаватель\и т.д."
                    />
                    <input
                      {...register("email", { required: false })}
                      className={`w-full rounded-lg border-2 ${
                        errors.email
                          ? "border-red-500 focus-visible:border-red-500"
                          : "border-slate-200"
                      } w-full px-4 py-4 outline-none transition-all focus-visible:border-slate-500 focus-visible:shadow-md focus-visible:shadow-slate-200`}
                      placeholder="Электронная почта"
                    />
                    <textarea
                      rows={6}
                      {...register("description", { required: false })}
                      className={`w-full rounded-lg border-2 ${
                        errors.description
                          ? "border-red-500 focus-visible:border-red-500"
                          : "border-slate-200"
                      } w-full px-4 py-4 outline-none transition-all focus-visible:border-slate-500 focus-visible:shadow-md focus-visible:shadow-slate-200`}
                      placeholder="Дополнительная информация (о преподавателе, о сдаче долгов)"
                    />
                    {(errors.fullName ||
                      errors.job ||
                      errors.email ||
                      errors.description) && (
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
                </div>
                <button
                  type="button"
                  className="mx-auto mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-slate-200"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Закрыть
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
