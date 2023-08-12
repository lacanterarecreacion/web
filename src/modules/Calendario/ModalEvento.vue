<template>
  <div
    class="flex justify-start items-center"
    :class="props.inCalendar ? ' absolute inset-0' : ''"
  >
    <button
      v-if="props.inCalendar"
      type="button"
      @click="openModal"
      class="absolute inset-0 w-full h-full outline-none"
    >
      <span class="sr-only"> Ver más información </span>
    </button>
    <button
      v-else
      type="button"
      @click="openModal"
      class="flex flex-col group hover:bg-gray-200 w-full hover:ring-1 ring-gray-600 bg-gray-100 duration-300 p-2 rounded-lg shadow"
    >
      <h3 class="flex items-start w-full justify-between text-gray-600">
        <span
          class="group-hover:underline underline-offset-2 w-full text-left text-sm font-bold font-sans"
          style="text-wrap: balance"
        >
          {{ props.event.title }}
        </span>
        <b
          class="!text-xs font-bold no-underline rounded-full px-2 py-0.5 bg-purple-200 text-purple-900 ml-1"
          v-if="props.event.backgroundColor === '#e9d5ff'"
        >
          Presencial
        </b>
        <b
          class="!text-xs font-bold no-underline rounded-full px-2 py-0.5 bg-orange-200 text-orange-900 ml-1"
          v-else
        >
          Virtual
        </b>
      </h3>
      <div class="flex items-end justify-between w-full pt-1 text-sm">
        <p class="text-left" style="text-wrap: balance">
          <span class="capitalize">{{
            new Date(props.event.start).toLocaleString("es-ar", {
              weekday: "long",
            })
          }}</span>
          {{ formattedDate(props.event.start) }}
        </p>
        <p class="text-gray-600 text-right pr-1">
          {{ formattedTime(props.event.start) }}hs
          <span v-if="props.event.end">
            a {{ formattedTime(props.event.end) }}hs
          </span>
        </p>
      </div>
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[10000]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gradient-to-br from-green-700/60 to-orange-600/60 backdrop-blur-sm"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-6 md:p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl px-2 md:px-6 relative transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-2xl transition-all"
              :class="props.event.extendedProps?.mainImage ? ' ' : '!pt-8'"
            >
              <!-- <img v-if="props.event.extendedProps?.image" :src="props.event.extendedProps?.image.secure_url"
                class="object-cover w-full h-64" /> -->
              <button
                type="button"
                class="absolute bg-gray-100/80 outline-none focus-visible:ring-1 hover:ring-1 ring-gray-900 z-50 top-2 w-8 flex justify-center items-center hover:bg-white/95 duration-300 h-8 right-2 rounded-full"
                @click="closeModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#333"
                    d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                  />
                </svg>
              </button>
              <div
                v-if="props.event.extendedProps?.mainImage"
                class="aspect-h-10 -mx-2 md:-mx-6 aspect-w-16"
              >
                <img
                  class="object-cover object-top w-full"
                  :src="imageUrlFor(props.event.extendedProps?.mainImage)"
                />
              </div>
              <div class="relative">
                <DialogTitle
                  as="h3"
                  class="text-xl md:text-3xl p-3 font-medium font-sans pr-28 text-gray-900"
                  style="text-wrap: balance"
                >
                  {{ props.event.title }}
                </DialogTitle>
                <div class="absolute top-1.5 right-0 m-3">
                  <b
                    class="!text-xs font-bold no-underline rounded-full px-2 py-0.5 bg-purple-200 text-purple-900 ml-1"
                    v-if="props.event.backgroundColor === 'purple'"
                  >
                    Presencial
                  </b>
                  <b
                    class="!text-xs font-bold no-underline rounded-full px-2 py-0.5 bg-orange-200 text-orange-900 ml-1"
                    v-else
                  >
                    Virtual
                  </b>
                </div>
                <div class="px-3">
                  <a
                    v-if="props.event.extendedProps?.link"
                    class="btn blue !text-xs mb-3 gap-2"
                    target="_blank"
                    :href="props.event.extendedProps?.link"
                  >
                    Link al evento
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="#ffffff"><path d="M5 6a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6zm10-3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z"/></g></svg>
                  </a>
                </div>
              </div>
              <div
                class="p-1 w-full px-3 flex sm:flex-row flex-col justify-between gap-1 md:gap-2 md:text-xl font-bold text-gray-800 z-10"
              >
                <p>
                  <span class="capitalize">
                    {{
                      new Date(props.event.start).toLocaleString("es-ar", {
                        weekday: "long",
                      })
                    }}
                  </span>
                  {{ formattedDate(props.event.start) }}
                </p>
                <time class="font-normal text-lg">
                  De {{ formattedTime(props.event.start) }} a
                  {{ formattedTime(props.event.end) }}hs
                </time>
              </div>
              <div
                v-if="props.event.extendedProps?.body"
                class="m-3 prose md:prose-lg"
              >
                <SanityBlocks :blocks="props.event.extendedProps?.body" />
              </div>
              <div class="mt-4 flex justify-center items-center p-3 gap-2">
                <button type="button" class="btn w-44 !text-xs !ring-2" @click="closeModal">
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  formattedDate,
  formattedTime,
  formattedDateGetDay,
} from "@/lib/formatCalendarDateTime";
import type { EventModal } from "@/types/interfaces";
import sanity from "@/lib/client";
import { SanityBlocks } from "sanity-blocks-vue-component";
import imageUrlBuilder from "@sanity/image-url";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanity);
const props = defineProps<EventModal>();
const isOpen = ref(false);

function imageUrlFor(source: SanityImageSource) {
  return builder.image(source).width(680).height(420).url();
}

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
