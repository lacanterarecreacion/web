<script>
import { defineComponent } from "vue";
import { formatDate } from "@fullcalendar/core";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import ModalEvento from "./ModalEvento.vue";
import ModalEventoAgenda from "./deprecated_ModalEventoAgenda.vue";
import IconSpinner from "./IconSpinner.vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import AgendaSkeleton from "./AgendaSkeleton.vue";

export default defineComponent({
  components: {
    FullCalendar,
    ModalEvento,
    ModalEventoAgenda,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    AgendaSkeleton,
    IconSpinner,
  },
  props: {
    calendarEvents: {
      type: Array,
    },
  },
  data() {
    return {
      isLoading: true,
      calendarOptions: {
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

        initialEvents: this.calendarEvents, // alternatively, use the `events` setting to fetch from a feed
        // select: this.handleDateSelect,
        // eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      allEvents: [],
      futureEvents: [],
    };
  },
  methods: {
    handleEvents(events) {
      this.isLoading = true;
      this.allEvents = events;
      this.isLoading = false;
    },
    formattedDate(value) {
      return formatDate(value, {
        month: "long",
        year: "numeric",
        day: "numeric",
        hour12: false,
        locale: "es",
      });
    },
    formattedTime(value) {
      return formatDate(value, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        locale: "es",
      });
    },
    isOldEvent(value) {
      const inputValue = value;
      const now = new Date().toISOString();
      return inputValue >= now;
    },
    eventosFuturos() {
      const newitem = this.calendarOptions.initialEvents.filter((evento) => {
        const fechaEvento = formatDate(evento.end, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour12: false,
          timeZoneName: "long",
          locale: "es",
        });
        const now = new Date().toISOString()
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
    },
  },
  mounted() {
    this.futureEvents = this.eventosFuturos();
  },
});
</script>

<template>
  <div class="block w-full pt-6 sm:pt-12 lg:hidden">
    <slot />
    <TabGroup>
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
          <div
            class="flex items-center justify-between pb-2 border-b-2 border-orange-600"
          >
            <h1 class="flex items-center font-sans text-2xl text-orange-600">
              Próximas actividades
            </h1>
            <IconSpinner v-if="isLoading" class="w-6 h-6" />
          </div>

          <div class="relative bg-white min-h-[400px]">
            <div v-if="!isLoading" class="relative z-10 bg-white">
              <ul class="md:h-[600px] overflow-y-auto px-1 mt-2">
                <li
                  class="flex flex-col py-1"
                  v-for="event in allEvents"
                  :key="event.id"
                >
                  <div
                    class="text-left group"
                    v-if="isOldEvent(event.startStr)"
                  >
                    <ModalEventoAgenda
                      :title="event.title"
                      :description="event.extendedProps.description"
                      :color="event.backgroundColor"
                      :eventDay="formattedDate(event.startStr)"
                      :eventTimeStart="formattedTime(event.startStr)"
                      :eventTimeEnd="formattedTime(event.endStr)"
                      :eventImage="event.extendedProps.image"
                      :eventLink="event.extendedProps.link"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-else
              class="flex flex-col items-center justify-center gap-3 px-1 mt-3"
            >
              <AgendaSkeleton />
              <AgendaSkeleton />
              <AgendaSkeleton />
              <AgendaSkeleton />
            </div>
          </div>
        </TabPanel>
        <TabPanel
          :class="[
            'rounded-xl bg-white p-1 md:p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
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
                :eventTimeStart="formattedTime(arg.event.startStr)"
                :eventTimeEnd="formattedTime(arg.event.endStr)"
                :eventImage="arg.event.extendedProps.image"
                :eventLink="arg.event.extendedProps.link"
              />
            </template>
          </FullCalendar>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>

  <div
    class="hidden w-full gap-1 mx-auto mt-2 bg-white shadow-lg lg:grid md:grid-cols-6 max-w-7xl sm:p-3 md:gap-2 rounded-xl"
  >
    <div class="md:col-span-2 md:p-2 md:pt-0 sm:px-2">
      <div
        class="flex items-center justify-between py-1 border-b-2 border-orange-600"
      >
        <h1 class="text-center w-full font-sans text-2xl text-orange-600">
          Próximas actividades
        </h1>
        <IconSpinner v-if="isLoading" class="w-6 h-6" />
      </div>
      <div
        v-if="isLoading"
        class="flex md:h-[600px] flex-col items-center justify-start gap-3 px-1 mt-4"
      >
        <AgendaSkeleton />
        <AgendaSkeleton />
        <AgendaSkeleton />
        <AgendaSkeleton />
      </div>

      <div>
        <ul class="md:h-[600px] overflow-y-auto px-1 mt-2">
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
                :eventTimeStart="formattedTime(event.start)"
                :eventTimeEnd="formattedTime(event.end)"
                :eventImage="event.extendedProps.image"
                :eventLink="event.extendedProps.link"
              />
            </div>
          </li>
        </ul>
      </div>
      <div>no hay eventos</div>
    </div>
    <div class="md:col-span-4 relative">
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
  @apply flex w-full justify-between md:justify-center items-center gap-1  md:gap-6;
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
  @apply !h-[75vh] md:!h-[660px];
}

.fc-toolbar-title {
  @apply font-sans capitalize !text-xs md:!text-lg md:min-w-[230px] text-center;
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
