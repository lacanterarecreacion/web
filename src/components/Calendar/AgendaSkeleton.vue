<template>
  <div class="flex flex-col w-full gap-2 p-1 bg-gray-100 rounded-md">
    <div class="w-32 h-6 pulse"></div>
    <div class="flex justify-between gap-6">
      <div class="w-24 h-4 pulse"></div>
      <div class="w-32 h-4 pulse"></div>
    </div>
  </div>
</template>

<style>

.pulse {
  animation: pulse-bg 1.3s infinite;
  @apply rounded-md
}

@keyframes pulse-bg {
  0% {
    @apply bg-gray-200
  }
  50% {
    @apply bg-gray-300/90
  }
  100% {
    @apply bg-gray-200
  }
}
</style>