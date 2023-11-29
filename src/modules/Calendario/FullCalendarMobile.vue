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
import NoEvent from "./NoEvent.vue";

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
  const nextDay = new Date(now + 24 * 60 * 60 * 1000).getTime();
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
    Next24Hours: [],
    NextWeek: [],
    NextMonth: [],
    NextSixMonths: [],
  };

  if (props.calendarEvents) {
    props.calendarEvents.forEach((evento: Event) => {
      const fechaEvento = new Date(evento.start).getTime();
      if (fechaEvento > now && fechaEvento <= nextDay) {
        eventsByPeriod["Next24Hours"].push(evento);
      } else if (fechaEvento > now && fechaEvento <= nextWeek) {
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

const eventosDay = futureEvents.value.Next24Hours;
const eventosWeek = futureEvents.value.NextWeek;
const eventosMonth = futureEvents.value.NextMonth;
const eventosSixMonth = futureEvents.value.NextSixMonths;
</script>

<template>
  <div
    class="w-full gap-1 mx-auto bg-white shadow-lg grid max-w-7xl lg:p-3 pt-8 md:pt-12 md:gap-2 md:rounded-xl"
  >
    <TabGroup :defaultIndex="1">
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

      <TabPanels class="mt-2">
        <TabPanel
          :class="[
            'rounded-xl bg-white py-3 pl-3',
            'ring-white focus:outline-none ',
          ]"
        >
          <div class="lg:col-span-2">
            <div
              class="flex items-center justify-between pt-3 pb-3 mb-2 border-b border-gray-300"
            >
              <div class="flex flex-col">
                <h1 class="text-left w-full font-hand text-3xl text-gray-800">
                  Próximas actividades
                </h1>
                Hoy es
                {{
                  new Date().toLocaleString("es-ar", {
                    day: "numeric",
                    year: "numeric",
                    month: "short",
                  })
                }}
              </div>
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
                  class="lg:h-[600px] overflow-y-auto px-1 lg:grid lg:grid-cols-4 flex flex-col gap-3 pt-4"
                >
                  <NoEvent
                    v-if="
                      eventosDay.length === 0 &&
                      eventosWeek.length === 0 &&
                      eventosMonth.length === 0 &&
                      eventosSixMonth.length === 0
                    "
                  />
                  <div v-if="eventosDay.length !== 0">
                    <p
                      class="font-bold text-orange-700 sticky -top-4 py-2 bg-white"
                    >
                      En las próximas 24hs
                    </p>
                    <div
                      class="grid py-1 gap-3 place-items-start md:grid-cols-2 lg:grid-cols-1"
                    >
                      <ModalEvento
                        v-for="event in eventosDay"
                        :key="event.id"
                        :event="event"
                      />
                    </div>
                  </div>
                  <div v-if="eventosWeek.length !== 0">
                    <p
                      class="font-bold text-orange-700 sticky -top-4 py-2 bg-white"
                    >
                      Dentro de 7 días
                    </p>
                    <div
                      class="grid py-1 gap-3 place-items-start md:grid-cols-2 lg:grid-cols-1"
                    >
                      <ModalEvento
                        v-for="event in eventosWeek"
                        :key="event.id"
                        :event="event"
                      />
                    </div>
                  </div>
                  <div v-if="eventosMonth.length !== 0">
                    <p
                      class="font-bold text-orange-700 sticky -top-4 py-2 bg-white"
                    >
                      En 30 días
                    </p>
                    <div
                      class="grid py-1 gap-3 place-items-start md:grid-cols-2 lg:grid-cols-1"
                    >
                      <ModalEvento
                        v-for="event in eventosMonth"
                        :key="event.id"
                        :event="event"
                      />
                    </div>
                  </div>
                  <div v-if="eventosSixMonth.length !== 0">
                    <p
                      class="font-bold text-orange-700 sticky -top-4 py-2 bg-white"
                    >
                      Próximos 6 Meses
                    </p>
                    <div
                      class="grid py-1 gap-3 place-items-start md:grid-cols-2 lg:grid-cols-1"
                    >
                      <ModalEvento
                        v-for="event in eventosSixMonth"
                        :key="event.id"
                        :event="event"
                      />
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
            'ring-white  focus:outline-none ',
          ]"
        >
          <div class="lg:col-span-4 min-h-[200px] px-1 relative">
            <FullCalendar :options="calendarOptions">
              <template v-slot:eventContent="arg">
                <div class="flex flex-col w-full p-2 overflow-hidden text-xs">
                  <p
                    class="line-clamp-3 text-gray-900/80 !font-sans font-bold"
                    style="text-wrap: balance"
                  >
                    {{ arg.event.title }}
                  </p>
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
