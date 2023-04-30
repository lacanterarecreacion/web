<script>
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { INITIAL_EVENTS } from "./event-utils";
import esLocale from "@fullcalendar/core/locales/es";
import ModalEvento from "./ModalEvento.vue";
import ModalEventoAgenda from "./ModalEventoAgenda.vue";
import { formatDate } from "@fullcalendar/core";

export default defineComponent({
  components: {
    FullCalendar,
    ModalEvento,
    ModalEventoAgenda,
  },
  props: {
    calendarEvents: {
      type: Array,
    },
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
          center: "prev,title,next",
          right: "",
          left: "today",
          // timeGridWeek, dayGridMonth
        },
        locale: esLocale,
        initialView: "dayGridMonth",
        initialEvents: this.calendarEvents, // alternatively, use the `events` setting to fetch from a feed
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
    class="grid md:grid-cols-6 w-full max-w-7xl mx-auto bg-white sm:p-3 gap-1 md:gap-2 mt-2 rounded-xl shadow-lg"
  >
    <div class="md:col-span-2 border-r md:pr-2">
      <div class="p-2 sm:px-2">
        <div
          class="flex justify-between border-b-2 border-orange-600 pb-2 items-center"
        >
          <h1 class="text-orange-600 font-mono text-2xl">Agendate</h1>
          <!-- <slot /> -->
          <span class="font-mono text-gray-500">
            {{ currentEvents.length }} eventos
          </span>
        </div>
        <!-- {{JSON.stringify(calendarEvents)}} -->
        <ul class="md:h-[600px] overflow-y-auto pr-1">
          <li
            class="flex border-b border-gray-300 py-1 flex-col"
            v-for="event in currentEvents"
            :key="event.id"
          >
            <div class="group text-left">
              <ModalEventoAgenda>
                <template #button>
                  <h3 class="flex font-mono text-orange-600 group-hover:underline underline-offset-2 justify-between items-center">
                    {{ event.title }}
                  </h3>
                  <div>
                    <h4 class="flex justify-between text-left items-center">
                      {{ event.extendedProps.description }}
                    </h4>
                  </div>
                  <div class="flex pt-2 text-sm w-full justify-between items-center">
                    <p>{{ formattedDate(event.startStr) }}</p>
                    <p class="flex text-gray-600 items-end">
                      {{ formattedTime(event.startStr) }}hs&nbsp;
                      <span v-if="event.endStr">
                        — {{ formattedTime(event.endStr) }}hs
                      </span>
                    </p>
                  </div>
                </template>
                <template #header>
                  {{ event.title }}
                </template>
                <template #image v-if="event.extendedProps.image">
                  <img
                    :src="event.extendedProps.image.secure_url"
                    class="w-full h-64 object-cover"
                  />
                </template>
                <template #link v-if="event.extendedProps.link">
                  <a
                    class="btn blue !text-xs w-44"
                    target="_blank"
                    :href="event.extendedProps.link"
                  >
                    Link al evento
                  </a>
                </template>
                <span>{{ formattedDate(event.startStr) }}</span>
                de {{ formattedTime(event.startStr) }}
                <span v-if="event.endStr">
                  a {{ formattedTime(event.endStr) }}
                </span>
                <p>{{ event.extendedProps.description }}</p>
              </ModalEventoAgenda>
            </div>
          </li>
        </ul>
        <div class="py-2">
          <a class="btn w-full green" href="/"> Volver al inicio </a>
        </div>
      </div>
    </div>
    <div class="md:col-span-4">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <div class="flex flex-col overflow-hidden w-full p-2 text-xs">
            <!-- <b>{{ arg.timeText }}</b> -->
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
                class="btn blue !text-xs w-44"
                target="_blank"
                :href="arg.event.extendedProps.link"
              >
                Link al evento
              </a>
            </template>
            <span>{{ formattedDate(arg.event.startStr) }}</span>
            {{ formattedTime(arg.event.startStr) }}hs
            <span v-if="arg.event.endStr">
              — {{ formattedTime(arg.event.endStr) }}hs
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
  @apply px-2 sm:px-0 mb-2 !important;
}

.fc-header-toolbar .fc-toolbar-chunk:nth-child(2) div {
  @apply flex justify-center items-center gap-6;
}

.fc .fc-col-header-cell-cushion {
  @apply font-mono font-normal uppercase text-sm;
}

.fc .fc-daygrid-day-number {
  @apply font-mono font-normal uppercase text-xs;
}

.fc .fc-view-harness {
  height: 660px !important;
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
