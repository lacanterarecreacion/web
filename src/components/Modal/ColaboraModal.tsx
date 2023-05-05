import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal} className="btn blue !text-xs">
        colaborá
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[90]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-gradient-to-tr from-blue-300/70 to-indigo-600/70 backdrop-blur">
              <div className="fixed inset-0 z-0 patternForest opacity-10 mix-blend-multiply" />
            </div>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full ring ring-white max-w-sm overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="w-full pt-3 overflow-hidden relative flex justify-center items-start  h-64 bg-blue-600">
                    <svg
                      className="w-72 opacity-80 relative z-10"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        className="fill-blue-100"
                        fill="currentColor"
                        d="m209.955 488.202l-121.242-46.62c-11.308-4.34-11.643-12.087-.79-17.288L204.8 469.236c15.024 5.777 37.23 4.92 51.774-1.96l161.522-76.6c10.014 4.436 9.864 11.818-.67 16.798L250.43 486.668c-10.983 5.195-29.128 5.902-40.477 1.534zm0-32.37L88.713 409.21c-9.623-3.69-11.303-9.85-4.903-14.81l120.99 46.517c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.433c5.855 4.417 4.38 10.36-4.542 14.58l-166.993 79.193c-10.983 5.196-29.128 5.903-40.477 1.534zm0-28.314L88.713 380.892c-9.624-3.69-11.302-9.85-4.902-14.813l120.99 46.523c15.024 5.77 37.23 4.914 51.774-1.96l165.393-78.438c5.855 4.416 4.38 10.36-4.542 14.58l-166.993 79.2c-10.983 5.194-29.128 5.895-40.477 1.533zm0-28.32L88.713 352.572c-9.624-3.69-11.302-9.85-4.902-14.812l120.99 46.524c15.024 5.776 37.23 4.92 51.774-1.96l165.393-78.44c5.855 4.424 4.38 10.368-4.542 14.586l-166.993 79.194c-10.983 5.196-29.128 5.897-40.477 1.534zm0-28.32L88.713 324.26c-11.35-4.355-11.643-12.15-.66-17.353l87.236-41.376l34.826 18.323c15.365 8.09 37.937 7.06 52.5-2.39l65.74-42.672l88.404 34.007c11.344 4.357 11.65 12.16.665 17.354l-166.993 79.195c-10.983 5.195-29.128 5.902-40.477 1.534zm6.85-99.73L93.44 206.22c-10.767-5.67-11.217-15.647-1.018-22.268l105.11-68.228h25.845l.015 64.962h58.664v-64.962H332.2l-27.487-41.39l118.91 62.584c10.763 5.67 11.212 15.646 1.013 22.268L254.803 269.418c-10.2 6.62-27.23 7.4-37.997 1.73zm21.637-105.523V100.67h-34.845l49.13-79.74l49.12 79.74H267v64.955h-28.558z"
                      />
                    </svg>

                    <Dialog.Title
                      as="h3"
                      className=" z-10 h-24 text-white absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-50% via-blue-900/80 to-blue-900/90 text-3xl flex justify-center items-end font-medium leading-6 text-center"
                    >
                      <span className="font-mono mb-6">Colaborá</span>
                    </Dialog.Title>
                    <div className="absolute inset-0 patternForest opacity-20 z-"></div>
                  </div>
                  <div className="mt-6 text-center px-6">
                    <p className="text-base font-mono text-gray-500">
                      Conocé todas las maneras en las que podés acompañarnos.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 p-3 gap-3 mt-4">
                    <button
                      type="button"
                      className="btn blue"
                      onClick={closeModal}
                    >
                      Volver atras
                    </button>
                    <a
                      className="btn text-center yellow"
                      href="/institucional/quienes-somos"
                    >
                      Conocer más
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
