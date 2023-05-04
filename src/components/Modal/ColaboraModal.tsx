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
            <div className="fixed inset-0 bg-gradient-to-r from-blue-300/90 to-indigo-600/90 backdrop-blur-3xl" />
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
                  <div className="w-full pt-3 overflow-hidden relative flex justify-center items-start  h-64 bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-72 opacity-80 relative z-10"
                      viewBox="0 0 512 512"
                    >
                      <path
                        className="fill-blue-100"
                        fill="currentColor"
                        d="m386.688 487.75l-119.236-55.423c-7.898-3.673-11.334-13.065-7.66-20.976l84.374-181.523c3.667-7.904 13.07-11.334 20.963-7.667l119.24 55.434c7.9 3.673 11.33 13.065 7.656 20.964l-84.37 181.524c-3.678 7.904-13.076 11.334-20.968 7.667zM98.95 467.945L19.79 284.09c-3.448-8.007.255-17.302 8.25-20.744l39.196-16.872l48.975 184.044c4.694 17.588 22.755 28.078 40.36 23.39l39.032-10.386l-75.907 32.686c-8.007 3.443-17.296-.255-20.744-8.262zm33.89-41.86L81.362 232.638c-2.24-8.42 2.78-17.078 11.19-19.312l34.033-9.052l-4.098 30.465c-2.422 18.036 10.224 34.652 28.285 37.087l79.828 10.758l-32.497 109.467c-3.345 11.28-.37 22.948 6.866 31.18l-52.82 14.05c-8.42 2.24-17.07-2.77-19.31-11.196zm108.428-4.76l-16.02-4.76c-8.36-2.49-13.12-11.267-10.644-19.627l56.97-191.9c2.484-8.36 11.28-13.12 19.622-10.65l49.073 14.583l.008-.005l.12.044l-.133-.034a32.798 32.798 0 0 0-11.705 13.605l-84.38 181.53a33.024 33.024 0 0 0-2.915 17.218zm-5.707-155.43l-82.486-11.117c-8.633-1.166-14.704-9.12-13.538-17.758l26.73-198.39c1.16-8.633 9.125-14.698 17.74-13.538l130.327 17.563c8.627 1.166 14.692 9.125 13.532 17.752L311.42 182.46l-15.33-4.552c-17.467-5.197-35.826 4.784-41.004 22.232l-19.525 65.755zm-5.19-31.46c4.67-3.055 7.474-7.438 8.42-13.145c.936-5.633-.357-10.617-3.866-14.945c-3.51-4.414-8.39-7.14-14.656-8.178c-6.344-1.057-11.93-.073-16.75 2.956c-4.826 3.03-7.692 7.316-8.615 12.87c-.898 5.386.425 10.42 3.97 15.082c3.565 4.504 8.525 7.285 14.863 8.34c6.35 1.057 11.893.062 16.634-2.98zm25.978-81.243c4.693-2.726 8.888-5.434 12.598-8.117c3.703-2.684 6.915-5.586 9.635-8.725a44.96 44.96 0 0 0 6.733-10.307c1.76-3.74 3.048-8.032 3.85-12.865c1.262-7.62 1.02-14.358-.735-20.234c-1.75-5.87-4.693-10.94-8.833-15.22c-4.135-4.27-9.24-7.753-15.318-10.43c-6.07-2.684-12.804-4.633-20.174-5.86c-7.692-1.28-15.3-1.602-22.815-.977c-7.516.614-14.63 2.247-21.346 4.88l-5.95 35.802c6.813-4.25 13.77-7.104 20.855-8.567c7.09-1.475 13.726-1.7 19.913-.668c21.467 4.092 19.44 24.898 8.76 34.03c-5.652 4.473-11.334 8.802-15.942 11.345c-10.48 5.914-27.69 23.125-22.542 45.145l31.284 5.202c-7.11-17.757 11.663-29.462 20.028-34.434z"
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
                      Conocé todas las maneras en las que podes acompañarnos.
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
                      className="btn yellow"
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
