<template>
  <button type="button" @click="openModal" class="absolute inset-0">
    <span class="sr-only"> Ver más información </span>
  </button>
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
        <div class="fixed inset-0 bg-gradient-to-br from-green-700/60 to-orange-600/60 backdrop-blur-sm" />
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
              <slot name="image" />
              <DialogTitle
                as="h3"
                class="text-2xl p-3 font-mono font-medium leading-6 text-gray-900"
              >
                <slot name="header" />
              </DialogTitle>
              <div class="px-3">
                <slot />
              </div>
              <div class="mt-4 flex justify-center items-center p-3 gap-2">
                <button type="button" class="btn !text-xs ghost w-44" @click="closeModal">
                  Cerrar
                </button>
                <slot name="link" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";


import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
