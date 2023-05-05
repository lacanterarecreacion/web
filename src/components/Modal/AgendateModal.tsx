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
      <button type="button" onClick={openModal} className="btn yellow !text-xs">
        Agendate
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
            <div className="fixed inset-0  bg-gradient-to-tr from-yellow-300/70 to-red-600/70 backdrop-blur">
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
                <Dialog.Panel className="w-full max-w-xs ring ring-white overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="w-full pt-3 overflow-hidden relative flex justify-center items-start  h-64 bg-orange-600">
                    <svg className="w-72 opacity-80 relative z-10" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path className="fill-orange-100" d="M119 31v66h18V31h-18zm256 0v66h18V31h-18zM73 89v30h366V89h-28v26h-54V89H155v26h-54V89H73zm0 48v302h366V137H73zm110 14h18v32h46v-32h18v32h46v-32h18v32h46v-32h18v32h32v18h-32v46h32v18h-32v46h32v18h-32v46h32v18H265v32h-18v-32h-46v32h-18v-32h-46v32h-18v-32H87v-18h32v-46H87v-18h32v-46H87v-18h32v-46H87v-18h96v-32zm-46 50v46h46v-46h-46zm64 0v46h46v-46h-46zm64 0v46h46v-46h-46zm64 0v46h46v-46h-46zm-192 64v46h46v-46h-46zm64 0v46h46v-46h-46zm64 0v13.27A25.379 25.379 0 0 1 278.27 265H265zm32.73 0A25.379 25.379 0 0 1 311 278.27V265h-13.27zm31.27 0v46h46v-46h-46zm-41 16c-3.973 0-7 3.027-7 7s3.027 7 7 7s7-3.027 7-7s-3.027-7-7-7zm-23 16.73V311h13.27A25.379 25.379 0 0 1 265 297.73zm46 0A25.379 25.379 0 0 1 297.73 311H311v-13.27zM137 329v46h46v-46h-46zm64 0v46h46v-46h-46zm64 0v46h46v-46h-46zm64 0v46h46v-46h-46z"/></svg>
                    <Dialog.Title
                      as="h3"
                      className=" z-10 h-24 text-white absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-50% via-yellow-900/80 to-yellow-900/90 text-2xl flex justify-center items-end font-medium leading-6 text-center"
                    >
                      <span className="font-mono mb-6">Calendario lúdico</span>
                    </Dialog.Title>
                    <div className="absolute inset-0 patternForest opacity-20 z-"></div>
                  </div>
                  <div className="mt-6 text-center px-6">
                    <p className="text-base font-mono text-gray-500">
                      Eventos presenciales y virtuales.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 p-3 gap-3 mt-4">
                    <button type="button" className="btn " onClick={closeModal}>
                      Volver atras
                    </button>
                    <a
                      className="btn text-center yellow"
                      href="/calendario-ludico"
                    >
                      ir a la agenda
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
