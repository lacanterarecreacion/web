<script>
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS } from "./event-utils";
import esLocale from "@fullcalendar/core/locales/es";
import ModalEvento from "./ModalEvento.vue";
import { formatDate } from "@fullcalendar/core";

export default defineComponent({
  components: {
    FullCalendar,
    ModalEvento,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        },
        locale: esLocale,
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      currentEvents: [],
    };
  },
  methods: {
    handleEvents(events) {
      this.currentEvents = events;
    },
    formattedDate(value) {
      // Use formatDate to format the date
      return formatDate(value, {
        month: "long",
        year: "numeric",
        day: "numeric",
        locale: "es",
      });
    },
    formattedTime(value) {
      // Use formatDate to format only the time, without date information
      return formatDate(value, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC+3",
        locale: "es",
      });
    },
  },
});
</script>
<template>
  <div
    class="grid md:grid-cols-6 w-full max-w-7xl mx-auto bg-white sm:p-3 gap-6 mt-2 rounded-xl shadow-lg"
  >
    <div class="md:col-span-2 border-r sm:px-2">
      <div class="">
        <h2
          class="font-mono flex justify-start text-gray-700 items-center text-xl gap-3 mb-2"
        >
          Próximos
          <span class="font-mono text-gray-500">
            {{ currentEvents.length }}
          </span>
          eventos
          <div style="flex: 1" />
          <slot />
        </h2>
        <ul class="md:h-[600px] overflow-y-auto">
          <li
            class="flex border-b border-gray-300 py-3"
            v-for="event in currentEvents"
            :key="event.id"
          >
            <div class="grow">
              <h4 class="font-bold">
                {{ event.title }} -
                {{ formattedDate(event.startStr) }}
              </h4>
              <p>{{ event.extendedProps.description }}</p>
            </div>
            <p class="flex flex-col text-gray-600 items-end">
              {{ formattedTime(event.startStr) }}
              <span v-if="event.endStr">
                {{ formattedTime(event.endStr) }}
              </span>
            </p>
          </li>
        </ul>

        <div class="py-2">
          <a class="btn w-full yellow" href="/"> Volver al inicio </a>
        </div>
      </div>
    </div>
    <div class="md:col-span-4">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <div class="flex flex-col overflow-hidden w-full p-2 text-xs">
            <b>{{ arg.timeText }}</b>
            <p class="truncate">{{ arg.event.title }}</p>
          </div>
          <ModalEvento>
            <template #header>
              {{ arg.event.title }}
            </template>
            <template #image v-if="arg.event.extendedProps.image">
              <img
                :src="arg.event.extendedProps.image.secure_url"
                class="w-full h-64 object-cover"
              />
            </template>
            <template #link v-if="arg.event.extendedProps.link">
              <a
                class="btn blue w-44"
                target="_blank"
                :href="arg.event.extendedProps.link"
              >
                Link al evento
              </a>
            </template>
            <span>{{ formattedDate(arg.event.startStr) }}</span>
            de {{ formattedTime(arg.event.startStr) }}
            <span v-if="arg.event.endStr">
              a {{ formattedTime(arg.event.endStr) }}
            </span>
            <p>{{ arg.event.extendedProps.description }}</p>
          </ModalEvento>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style>
.fc-header-toolbar {
  @apply flex-col sm:flex-row;
}

.fc .fc-view-harness {
  height: 600px !important;
}

.fc-toolbar-title {
  @apply font-mono capitalize !text-lg;
}

.fc .fc-button {
  @apply bg-transparent text-gray-800 p-1 px-1.5;
}

.fc .fc-event {
  @apply bg-amber-600 border-amber-700 !important;
  color: #fff;
}
</style>
