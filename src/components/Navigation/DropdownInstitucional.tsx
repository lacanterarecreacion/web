import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Example() {
  return (
    <div className="hidden xl:flex">
      <Menu as="div" className="relative font-sans">
        <Menu.Button className="rounded-md outline-none focus:ring-2 ring-offset-2 cursor-pointer flex items-center text-left hover:text-indigo-600 duration-300 text-gray-900 font-hand text-2xl">
          Quiénes somos
          <svg
            className={`
                  h-6 w-6 -translate-x-1 text-indigo-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
            />
          </svg>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute translate-x-6 translate-y-2 ring-2 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-indigo-500/50 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/quienes-somos/la-cantera"
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full font-hand items-center rounded-md px-2 py-4 text-2xl justify-center`}
                  >
                    Qué es La Cantera
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/quienes-somos/nuestra-historia"
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full font-hand items-center rounded-md px-2 py-4 text-2xl justify-center`}
                  >
                    Nuestra historia
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
