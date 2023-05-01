<template>
  <div class="flex flex-col w-full gap-2 p-3 bg-gray-100 rounded-md">
    <div class="w-32 h-6 pulse"></div>
    <div class="w-64 h-6 pulse"></div>
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
    background-color: #ddd;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #ddd;
  }
}
</style>