import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Example() {
  return (
    <div className="hidden xl:flex">
      <Menu as="div" className="relative font-mono">
        <div>
          <Menu.Button className="outline-none focus:ring-2 ring-offset-2 cursor-pointer flex items-center text-left hover:text-orange-600 duration-300 text-gray-900 font-mono">
            Institucional
            <svg
              className={`
                  h-6 w-6 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/institucional/quienes-somos"
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full font-mono items-center rounded-md px-2 py-4 text-sm`}
                  >
                    Sobre Cantera
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/institucional/quienes-somos#nuestra-historia"
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full font-mono items-center rounded-md px-2 py-4 text-sm`}
                  >
                    Nuestra historia
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/institucional/quienes-somos#que-hacemos"
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full font-mono items-center rounded-md px-2 py-4 text-sm`}
                  >
                    Que hacemos
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
