<template>
  <button type="button" @click="openModal" class="btn green">Ver más</button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[999]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-emerald-700/80 backdrop-blur-lg" />
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
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all"
            >
              <img class="h-64 w-full object-cover" :src="image"/>
              <DialogTitle
                as="h3"
                class="text-2xl p-6 font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2 px-6">
                <slot />
              </div>
              <div class="mt-4 grid grid-cols-2 p-6 gap-3">
                <button
                  type="button"
                  class="btn"
                  @click="closeModal"
                >
                  Cerrar
                </button>
                <a
                  :href="'/que-hacemos/' + slug"
                  class="btn relative z-10 green"
                >
                  Conocé más
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
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

interface Props {
  title?: string;
  image?: string;
  slug?: string;
}

const props = defineProps<Props>();

const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
