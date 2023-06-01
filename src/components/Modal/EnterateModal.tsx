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
      <button type="button" onClick={openModal} className="btn green !text-xs md:!py-2">
        Enterate
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
            <div className="fixed inset-0  bg-gradient-to-tr from-emerald-300/90 to-blue-600/90 backdrop-blur">
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
                <Dialog.Panel className="w-full max-w-xl px-3  text-left align-middle transition-all transform">
                  <button
                    type="button"
                    className="w-14 h-14 rounded-full duration-300 absolute outline-none focus-visible:ring-2 ring-white z-20 top-0 right-0 flex justify-center items-center"
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#fff"
                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                      />
                    </svg>
                  </button>
                  <div className="relative z-10 grid w-full gap-3 pb-6 max-w-7xl animate__fadeIn animate__animated">
                    <div className="flex flex-col gap-2 sm:gap-6 mt-2 lg:pr-6">
                      <h2 className="text-3xl text-white lg:text-6xl">
                        <span className="font-hand font-light">Enterate</span>
                      </h2>
                      <p className="max-w-xl font-sans sm:text-xl text-white">
                        En ambos canales recibiran información oficial sobre
                        eventos, reuniones y actualizaciones relacionadas al
                        juego.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 mt-6 gap-6">
                      <div className="w-full ring ring-white max-w-sm overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <div className="w-full pt-3 overflow-hidden relative flex justify-center items-start h-32 bg-emerald-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            viewBox="0 0 256 258"
                          >
                            <defs>
                              <linearGradient
                                id="logosWhatsappIcon0"
                                x1="50%"
                                x2="50%"
                                y1="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stop-color="#1FAF38" />
                                <stop offset="100%" stop-color="#60D669" />
                              </linearGradient>
                              <linearGradient
                                id="logosWhatsappIcon1"
                                x1="50%"
                                x2="50%"
                                y1="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stop-color="#F9F9F9" />
                                <stop offset="100%" stop-color="#FFF" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="url(#logosWhatsappIcon0)"
                              d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
                            />
                            <path
                              fill="url(#logosWhatsappIcon1)"
                              d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z"
                            />
                            <path
                              fill="#FFF"
                              d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
                            />
                          </svg>

                          <Dialog.Title
                            as="h3"
                            className=" z-10 h-24 text-white absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-50% via-green-900/80 to-green-900/90 text-2xl flex justify-center items-end font-medium leading-6 text-center"
                          >
                            <span className="font-atkinson font-bold mb-6">Whatsapp</span>
                          </Dialog.Title>
                          <div className="absolute inset-0 patternForest opacity-20 z-0"></div>
                        </div>

                        <a
                          className="btn text-center my-3 green"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://chat.whatsapp.com/BrRcAcACvCjLXyH61w4RJm"
                        >
                          Ir al grupo
                        </a>
                      </div>
                      <div className="w-full ring ring-white max-w-sm overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <div className="w-full pt-3 overflow-hidden relative flex justify-center items-start h-32 bg-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            viewBox="0 0 256 256"
                          >
                            <defs>
                              <linearGradient
                                id="logosTelegram0"
                                x1="50%"
                                x2="50%"
                                y1="0%"
                                y2="100%"
                              >
                                <stop offset="0%" stop-color="#2AABEE" />
                                <stop offset="100%" stop-color="#229ED9" />
                              </linearGradient>
                            </defs>
                            <path
                              fill="url(#logosTelegram0)"
                              d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"
                            />
                            <path
                              fill="#FFF"
                              d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"
                            />
                          </svg>
                          <Dialog.Title
                            as="h3"
                            className=" z-10 h-24 text-white absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-50% via-blue-900/80 to-blue-900/90 text-2xl flex justify-center items-end font-medium leading-6 text-center"
                          >
                            <span className="font-atkinson font-bold mb-6">Telegram</span>
                          </Dialog.Title>
                          <div className="absolute inset-0 patternForest opacity-20 z-"></div>
                        </div>
                        <a
                          className="btn blue my-3"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://t.me/lacanterarecreacion"
                        >
                          Ir al grupo
                        </a>
                      </div>
                    </div>
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
