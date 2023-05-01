<template>
  <div class="xl:hidden">
    <Transition
      enter-from-class="opacity-0"
      enter-active-class=""
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class=""
      leave-to-class="opacity-0"
    >
      <button
        class="fixed inset-0 z-40 bg-white/60 backdrop-blur"
        @click="show = !show"
        v-if="!show"
      />
    </Transition>
    <button
      class="fixed text-lg justify-center items-center ring ring-orange-600 p-1 sm:p-2 bg-white font-bold text-gray-900 right-0 z-[60] flex top-0 lg:top-0 mr-2 rounded-lg my-3"
      @click="show = !show"
    >
      <span>Menú</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
    <Transition
      enter-from-class="translate-x-full"
      enter-active-class=""
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-active-class=""
      leave-to-class="translate-x-full"
    >
      <div
        v-if="!show"
        class="OffcanvasNav OffcanvasNavRight fixed right-0 text-center shadow-lg font-mono text-2xl space-y-12 top-0 bottom-0 bg-white duration-700 w-64 p-3 z-[60] flex justify-start pt-2 flex-col"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const show = ref(true);
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
