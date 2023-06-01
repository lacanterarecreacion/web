<script setup lang="ts">
import { ref } from "vue";
import type { EventApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import ModalEvento from "./ModalEvento.vue";
import IconSpinner from "./IconSpinner.vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import AgendaSkeleton from "./AgendaSkeleton.vue";
import type { Events, Event, EventsByTimes } from "@/types/interfaces";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const props = defineProps<Events>();
const isLoading = ref(true);
const allEvents = ref<EventApi[]>([]);
const futureEvents = ref<EventsByTimes>({} as EventsByTimes);

const handleEvents = (events: EventApi[]) => {
  isLoading.value = true;
  allEvents.value = events;
  isLoading.value = false;
};

const eventosFuturos = () => {
  const now = new Date().getTime();
  const nextWeek = new Date(now + 7 * 24 * 60 * 60 * 1000).getTime();
  const nextMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  ).getTime();
  const nextSixMonths = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 6,
    new Date().getDate()
  ).getTime();

  const eventsByPeriod: EventsByTimes = {
    NextWeek: [],
    NextMonth: [],
    NextSixMonths: [],
  };

  if (props.calendarEvents) {
    props.calendarEvents.forEach((evento: Event) => {
      const fechaEvento = new Date(evento.end).getTime();
      if (fechaEvento > now && fechaEvento <= nextWeek) {
        eventsByPeriod["NextWeek"].push(evento);
      } else if (fechaEvento > now && fechaEvento <= nextMonth) {
        eventsByPeriod["NextMonth"].push(evento);
      } else if (fechaEvento > now && fechaEvento <= nextSixMonths) {
        eventsByPeriod["NextSixMonths"].push(evento);
      }
    });
  }
  return eventsByPeriod;
};

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

futureEvents.value = eventosFuturos();

const eventosWeek = futureEvents.value.NextWeek;
const eventosMonth = futureEvents.value.NextMonth;
const eventosSixMonth = futureEvents.value.NextSixMonths;
</script>

<template>
  <div
    class="w-full gap-1 mx-auto bg-white shadow-lg mb-20 grid  max-w-7xl lg:p-3 pt-12 md:gap-2 rounded-xl"
  >
    <TabGroup :defaultIndex="1  ">
      <TabList class="flex p-1 mx-2 space-x-1 rounded-xl bg-orange-300/20">
        <Tab as="template" v-slot="{ selected }">
          <button :class="['tab', selected ? 'selected ' : '']">Agenda</button>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <button :class="['tab', selected ? 'selected ' : '']">
            Calendario
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2 px-3">
        <TabPanel
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <div class="lg:col-span-2 lg:p-2 lg:pt-0 lg:px-2">
            <div
              class="flex items-center justify-between pt-3 pb-3 mb-2 border-b border-gray-300"
            >
              <h1 class="text-left w-full font-hand text-3xl text-gray-800">
                Proximas actividades
              </h1>
              <IconSpinner v-if="isLoading" class="w-6 h-6" />
            </div>
            <Transition>
              <div
                v-if="isLoading"
                class="flex lg:h-[600px] flex-col items-center justify-start gap-3 px-2 mt-4"
              >
                <AgendaSkeleton v-for="i in 6" />
              </div>

              <div v-else-if="futureEvents">
                <div
                  class="lg:h-[600px] overflow-y-auto px-1 grid  xl:grid-cols-3 gap-3 mt-4"
                >
                  <div v-if="eventosWeek.length !== 0">
                    <p class="font-bold text-orange-600">Próximos 7 días</p>
                    <div
                      class="grid  py-1 gap-3"
                      v-for="event in eventosWeek"
                      :key="event.id"
                    >
                      <ModalEvento :event="event" />
                    </div>
                  </div>
                  <div v-if="eventosMonth.length !== 0">
                    <p class="font-bold text-orange-600">Próximos 30 días</p>
                    <div
                      class="grid  py-1 gap-3"
                      v-for="event in eventosMonth"
                      :key="event.id"
                    >
                      <ModalEvento :event="event" />
                    </div>
                  </div>
                  <div v-if="eventosSixMonth">
                    <p class="font-bold text-orange-600">Próximos 6 Meses</p>
                    <div
                      class="grid  gap-3 py-1"
                      v-for="event in eventosSixMonth"
                      :key="event.id"
                    >
                      <ModalEvento :event="event" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div
                  class="bg-indigo-200 text-indigo-800 rounded-md mt-3 h-64 flex justify-center items-center text-center p-6"
                >
                  No hay eventos programados
                </div>
              </div>
            </Transition>
          </div>
        </TabPanel>
        <TabPanel
          :class="[
            'rounded-xl bg-white p-1 md:p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <div class="lg:col-span-4 min-h-[200px] px-1 relative">
            <FullCalendar :options="calendarOptions">
              <template v-slot:eventContent="arg">
                <div class="flex flex-col w-full p-2 overflow-hidden text-xs">
                  <p class="truncate !font-sans">{{ arg.event.title }}</p>
                </div>
                <ModalEvento inCalendar :event="arg.event" />
              </template>
            </FullCalendar>
            <div
              v-if="isLoading"
              class="absolute top-0 right-0 h-full rounded-lg overflow-hidden w-full bg-gray-100 flex justify-center items-center z-50"
            >
              <IconSpinner />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
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
