<template>
  <div class="flex justify-start items-center">
    <button
      v-if="props.inCalendar"
      type="button"
      @click="openModal"
      class="absolute inset-0"
    >
      <span class="sr-only"> Ver más información </span>
    </button>
    <button
      v-else
      type="button"
      @click="openModal"
      class="flex flex-col group hover:bg-gray-200 w-full hover:ring-1 ring-gray-600 bg-gray-100 duration-300 p-2 rounded-lg shadow"
    >
      <h3 class="flex items-center w-full justify-between text-gray-600">
        <span
          class="group-hover:underline underline-offset-2 truncate w-64 text-left text-sm font-bold font-sans"
        >
          {{ props.event.title }}
        </span>
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
      </h3>
      <div class="flex items-start justify-between w-full pt-1 text-sm">
        <p class="text-left">
          {{ formattedDate(props.event.start) }} al <br />{{
            formattedDate(props.event.end)
          }}
        </p>
        <p class="flex flex-col items-end text-gray-600">
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
          class="flex min-h-full items-center justify-center p-4 text-center"
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
              class="w-full max-w-xl relative transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-2xl transition-all"
            >
              <img
                v-if="props.event.extendedProps?.image"
                :src="props.event.extendedProps?.image.secure_url"
                class="object-cover w-full h-64"
              />
              <div class="relative">
                <DialogTitle
                  as="h3"
                  class="text-3xl p-3 font-medium font-sans pr-28 text-gray-900"
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
              </div>
              <div
                class="p-1 max-w-lg px-3 inline-flex mx-3 text-gray-800 bg-gray-200 rounded-full z-10"
              >
                <span
                  >{{ formattedDate(props.event.start) }} de
                  {{ formattedTime(props.event.start) }}
                </span>
                <span v-if="formattedTime(props.event.end)"
                  >&nbsp; a {{ formattedTime(props.event.end) }}
                </span>
              </div>
              <p class="m-3 text-lg">
                {{ props.event.extendedProps?.description }}
              </p>
              <div class="mt-4 flex justify-center items-center p-3 gap-2">
                <button
                  type="button"
                  class="btn !text-xs ghost w-44"
                  @click="closeModal"
                >
                  Cerrar
                </button>
                <a
                  v-if="props.event.extendedProps?.link"
                  class="btn blue !text-xs w-44"
                  target="_blank"
                  :href="props.event.extendedProps?.link"
                >
                  Link al evento
                </a>
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
import { formattedDate, formattedTime } from "@/lib/formatCalendarDateTime";
import type { EventModal } from "@/types/interfaces";


import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps<EventModal>();

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>