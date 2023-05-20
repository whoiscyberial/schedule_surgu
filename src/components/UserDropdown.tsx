import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";
import type { SessionContextValue } from "next-auth/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  session: SessionContextValue;
};

export default function DropdownMenu({ session }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center  rounded-md bg-white px-3 py-2 hover:bg-slate-100">
          {session.data?.user.image ? (
            <img
              src={session.data?.user.image}
              alt="profile picture"
              className="h-[48px] w-[48px] rounded-full"
            />
          ) : (
            <img
              src="https://vk.com/images/camera_50.png"
              alt="profile picture"
              className="h-[64px] w-[64px] rounded-full"
            />
          )}
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5"
            color="rgb(100 116 139)"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => void signOut()}
                  className={classNames(
                    active ? "bg-gray-100 text-slate-900" : "text-gray-700",
                    "block w-full px-4 py-3 text-left text-sm"
                  )}
                >
                  Выход
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
