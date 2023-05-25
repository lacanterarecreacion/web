<script setup lang="ts">
import { ref } from "vue";
import { DateInput, formatDate, EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import ModalEventoAgenda from "./ModalEventoAgenda.vue";
import IconSpinner from "./IconSpinner.vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import AgendaSkeleton from "./AgendaSkeleton.vue";
import {
  formattedDate,
  formattedTime,
} from "@/lib/formatCalendarDateTime";

import type { Events, Event } from "@/types/interfaces";

const props = defineProps<Events>();
const isLoading = ref(true);
const allEvents = ref<EventApi[]>([]);
const futureEvents = ref<Event[]>([]);

const handleEvents = (events: EventApi[]) => {
  isLoading.value = true;
  allEvents.value = events;
  isLoading.value = false;
  console.log(events);
};

const eventosFuturos = () => {
  const newitem = props.calendarEvents?.filter((evento: Event) => {
    const fechaEvento = formatDate(evento.end, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour12: false,
      timeZoneName: "long",
      locale: "es",
    });
    const now = new Date().toISOString();
    const now2 = formatDate(now, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour12: false,
      timeZoneName: "long",
      locale: "es",
    });
    return fechaEvento > now2;
  });
  return newitem;
};

futureEvents.value = eventosFuturos();

const calendarOptions = {
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin, // needed for dateClick
  ],
  headerToolbar: {
    center: "prev,title,next",
    right: "",
    left: "today",
    // timeGridWeek, dayGridMonth
  },
  locale: esLocale,
  initialView: "dayGridMonth",

  editable: false,
  selectable: true,
  selectMirror: false,
  dayMaxEvents: false,
  weekends: true,
  eventColor: "#999",
  eventDisplay: "block",

  initialEvents: props.calendarEvents,
  eventsSet: handleEvents,
};
</script>

<template>
  <div
    class="w-full gap-1 mx-auto mt-2 bg-white shadow-lg mb-20 grid lg:grid-cols-6 max-w-2xl lg:max-w-7xl sm:p-3 md:gap-2 rounded-xl"
  >
    <div class="lg:col-span-2 lg:p-2 lg:pt-0 lg:px-2">
      <div class="flex items-center justify-between py-8">
        <h1 class="text-center w-full font-sans text-2xl text-orange-600">
          Próximas actividades
        </h1>
        <IconSpinner v-if="isLoading" class="w-6 h-6" />
      </div>
      <div
        v-if="isLoading"
        class="flex lg:h-[600px] flex-col items-center justify-start gap-3 px-2 mt-4"
      >
        <AgendaSkeleton v-for="i in 3" />
      </div>
      <div v-else-if="futureEvents.length !== 0">
        <ul class="lg:h-[600px] overflow-y-auto px-1 mt-2">
          <li
            class="flex flex-col py-1"
            v-for="event in futureEvents"
            :key="event.id"
          >
            <div class="text-left group">
              <ModalEventoAgenda
                :title="event.title"
                :description="event.extendedProps.description"
                :color="event.color"
                :eventDay="formattedDate(event.start)"
                :eventDayEnd="formattedDate(event.end)"
                :eventTimeStart="formattedTime(event.start)"
                :eventTimeEnd="formattedTime(event.end)"
                :eventImage="event.extendedProps.image"
                :eventLink="event.extendedProps.link"
              />
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <div
          class="bg-indigo-200 text-indigo-800 rounded-md mt-3 h-64 flex justify-center items-center text-center p-6"
        >
          No hay eventos programados
        </div>
      </div>
    </div>
    <div class="lg:col-span-4 min-h-[200px] pt-8 px-1 relative">
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <div class="flex flex-col w-full p-2 overflow-hidden text-xs">
            <p class="truncate !font-sans">{{ arg.event.title }}</p>
          </div>
          <ModalEventoAgenda
            inCalendar
            :title="arg.event.title"
            :description="arg.event.extendedProps.description"
            :color="arg.event.backgroundColor"
            :eventDay="formattedDate(arg.event.startStr)"
            :eventDayEnd="formattedDate(arg.event.endStr)"
            :eventTimeStart="formattedTime(arg.event.startStr)"
            :eventTimeEnd="formattedTime(arg.event.endStr)"
            :eventImage="arg.event.extendedProps.image"
            :eventLink="arg.event.extendedProps.link"
          />
        </template>
      </FullCalendar>
      <div
        v-if="isLoading"
        class="absolute top-0 right-0 h-full rounded-lg overflow-hidden w-full bg-gray-100 flex justify-center items-center z-50"
      >
        <IconSpinner />
      </div>
    </div>
  </div>
</template>

<style>
.fc-header-toolbar {
  @apply px-0 mb-2 gap-2 md:gap-0 !important;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(2) div {
  @apply flex w-full justify-center items-center gap-1  md:gap-6;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(2) {
  @apply w-full md:w-auto;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(3) {
  @apply hidden md:flex;
}

.fc .fc-col-header-cell-cushion {
  @apply font-sans font-normal uppercase text-sm;
}

.fc .fc-daygrid-day-number {
  @apply font-sans font-normal uppercase text-xs;
}

.fc .fc-view-harness {
  @apply !h-[75vh] md:!h-[560px];
}

.fc-toolbar-title {
  @apply font-sans capitalize !text-xs md:!text-lg min-w-[230px] text-center;
}

.fc .fc-button {
  @apply bg-transparent text-gray-800 p-0.5 px-1.5 flex justify-center items-center;
}

.fc .fc-today-button {
  @apply font-sans disabled:bg-orange-600 p-1 px-2 disabled:border-none disabled:cursor-not-allowed text-sm disabled:text-white bg-white text-gray-600;
}

.fc .fc-day-past .fc-event {
  @apply bg-gray-800 border-gray-700 hover:ring-2 ring-gray-300 !important;
  color: #fff;
}

.tab {
  @apply w-full rounded-lg py-2.5 font-sans text-sm font-medium bg-white/60 leading-5 text-orange-700;
  @apply ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2;
}

.tab.selected {
  @apply bg-white shadow text-orange-700 hover:bg-orange-200;
}

/* .fc .fc-event {
  @apply bg-amber-600 border-amber-700 hover:ring-2 ring-orange-300 !important;
  color: #fff;
} */
</style>
