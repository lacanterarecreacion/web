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
            <div className="fixed inset-0 bg-gradient-to-r from-orange-300/90 to-orange-600/60 backdrop-blur-3xl" />
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
                <Dialog.Panel className="w-full max-w-sm overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="w-full pt-3 overflow-hidden relative flex justify-center items-start  h-64 bg-orange-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-72 opacity-80 relative z-10"
                      viewBox="0 0 512 512"
                    >
                      <path
                        className="fill-orange-100"
                        fill="currentColor"
                        d="m331.088 488.95l-101.23-47.053c-6.698-3.122-9.62-11.094-6.503-17.815l71.63-154.11c3.117-6.71 11.1-9.624 17.804-6.508l101.23 47.066c6.71 3.115 9.62 11.088 6.51 17.797l-71.64 154.11c-3.12 6.714-11.098 9.618-17.802 6.514zM86.8 472.134L19.596 316.04c-2.927-6.797.218-14.686 7.004-17.607l33.275-14.328l41.578 156.25c3.99 14.937 19.32 23.84 34.267 19.864l33.14-8.823l-64.445 27.752c-6.798 2.92-14.687-.22-17.614-7.017zm28.774-35.535L71.87 272.362c-1.905-7.152 2.362-14.498 9.502-16.398l28.89-7.683l-3.475 25.864c-2.06 15.313 8.68 29.423 24.01 31.488l67.774 9.135l-27.586 92.934c-2.845 9.578-.313 19.486 5.83 26.472L131.968 446.1c-7.146 1.906-14.493-2.35-16.393-9.5zm92.055-4.043l-13.603-4.042c-7.1-2.112-11.14-9.565-9.034-16.664l48.364-162.92c2.112-7.1 9.577-11.14 16.658-9.04l41.667 12.38l.006-.006l.112.035l-.118-.03a27.79 27.79 0 0 0-9.937 11.547L210.1 417.944a27.964 27.964 0 0 0-2.47 14.61zm-4.846-131.957l-70.033-9.44c-7.328-.992-12.48-7.743-11.494-15.078l22.695-168.43c.987-7.33 7.75-12.48 15.06-11.496l110.65 14.912c7.322.99 12.48 7.748 11.488 15.07l-13.96 103.622l-13.02-3.866c-14.828-4.408-30.412 4.066-34.808 18.878l-16.576 55.828zm253.322-8.668l-7.253-15.94l37.418-16.98l7.23 15.95l-37.394 16.97zm-9.353-27.805l-32.792-72.222a93.526 93.526 0 0 0 32.026-14.41l32.726 72.133l-31.96 14.5zm-83.41-88.155c-41.006-16.174-61.152-62.585-44.977-103.603c16.18-40.993 62.603-61.15 103.603-44.977c41.01 16.18 61.15 62.604 44.982 103.62c-16.187 40.995-62.604 61.147-103.61 44.96zm86.378-51.78c12.434-31.488-3.038-67.135-34.55-79.563c-31.493-12.427-67.14 3.045-79.58 34.544c-12.427 31.5 3.05 67.16 34.557 79.58c31.5 12.43 67.146-3.043 79.574-34.56zm-30.106-16.96c1.96-22.547-12.634-42.758-33.676-48.653c3.86-.732 7.9-.956 12.014-.602c24.27 2.1 42.292 23.492 40.197 47.768c-2.078 23.94-22.914 41.79-46.766 40.274c15.366-6.48 26.702-21.03 28.23-38.787z"
                      />
                    </svg>
                    <Dialog.Title
                      as="h3"
                      className=" z-10 h-24 text-white absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-50% via-yellow-900/80 to-yellow-900/90 text-3xl flex justify-center items-end font-medium leading-6 text-center"
                    >
                      <span className="font-mono mb-6">Calendario lúdico</span>
                    </Dialog.Title>
                    <div className="absolute inset-0 patternForest opacity-20 z-"></div>
                  </div>
                  <div className="grid grid-cols-2 p-3 gap-3 mt-4">
                    <button type="button" className="btn " onClick={closeModal}>
                      Volver atras
                    </button>
                    <a
                      className="btn yellow"
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
