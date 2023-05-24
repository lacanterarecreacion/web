<template>
  <div class="flex justify-start items-center">
    <button
      v-if="inCalendar"
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
          class="group-hover:underline underline-offset-2 text-sm font-bold font-sans"
          >{{ title }}
        </span>

        <b
          class="!text-xs font-bold no-underline rounded-full px-2 py-0.5 bg-purple-200 text-purple-900 ml-1"
          v-if="color === 'purple'"
          >Presencial</b
        >
        <b
          class="!text-xs font-bold no-underline rounded-full px-2 py-0.5 bg-orange-200 text-orange-900 ml-1"
          v-else
          >Virtual</b
        >
      </h3>
      <div class="flex items-start justify-between w-full pt-1 text-sm">
        <p class="text-left">{{ eventDay }} al <br/>{{eventDayEnd}}</p>
        <p class="flex flex-col items-end text-gray-600">
          {{ eventTimeStart }}hs
          <span v-if="eventTimeEnd"> a {{ eventTimeEnd }}hs </span>
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
              class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-2xl transition-all"
            >
              <img
                v-if="eventImage"
                :src="eventImage.secure_url"
                class="object-cover w-full h-64"
              />
              <div class="relative">
                <DialogTitle
                  as="h3"
                  class="text-2xl p-3 font-medium font-sans leading-6 text-gray-900"
                >
                  {{ title }}
                </DialogTitle>
                <div class="absolute top-0 right-0 m-3">
                  <b
                    class="!text-xs font-bold no-underline rounded-full px-2 py-0.5 bg-purple-200 text-purple-900 ml-1"
                    v-if="color === 'purple'"
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
              <div class="px-3">
                <span>{{ eventDay }}</span>
                de {{ eventTimeStart }}
                <span v-if="eventTimeEnd"> a {{ eventTimeEnd }} </span>
                <p>{{ description }}</p>
              </div>
              <div class="mt-4 flex justify-center items-center p-3 gap-2">
                <button
                  type="button"
                  class="btn !text-xs ghost w-44"
                  @click="closeModal"
                >
                  Cerrar
                </button>
                <a
                  v-if="eventLink"
                  class="btn blue !text-xs w-44"
                  target="_blank"
                  :href="eventLink"
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

interface Image {
  secure_url: string;
}

interface Props {
  inCalendar?: boolean;
  title?: string;
  description?: string;
  color?: string;
  eventDay?: string;
  eventDayEnd?: string;
  eventTimeStart?: string;
  eventTimeEnd?: string;
  eventImage?: Image;
  eventLink?: string;
}

const props = defineProps<Props>();

const isOpen = ref(false);

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
