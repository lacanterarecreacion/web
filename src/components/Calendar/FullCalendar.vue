<script>
import { defineComponent } from "vue";
import { formatDate } from "@fullcalendar/core";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import ModalEvento from "./ModalEvento.vue";
import ModalEventoAgenda from "./ModalEventoAgenda.vue";
import timeGridPlugin from "@fullcalendar/timegrid";

export default defineComponent({
  components: {
    FullCalendar,
    ModalEvento,
    ModalEventoAgenda,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
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
      return formatDate(value, {
        month: "long",
        year: "numeric",
        day: "numeric",
        locale: "es",
      });
    },
    formattedTime(value) {
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
  <div class="w-full block lg:hidden pt-20">
    <slot />
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-orange-900/20 p-1 mx-2">
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-full rounded-lg py-2.5 font-mono text-sm font-medium leading-5 text-orange-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-orange-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            Agenda
          </button>
        </Tab>
        <Tab as="template" v-slot="{ selected }">
          <button
            :class="[
              'w-full rounded-lg py-2.5 font-mono text-sm font-medium leading-5 text-orange-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-orange-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            Calendario
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <div
            class="flex justify-between border-b-2 border-orange-600 pb-2 items-center"
          >
            <h1 class="text-orange-600 font-mono text-2xl flex items-center">
              Agendate
            </h1>
            <span class="font-mono text-gray-500">
              {{ currentEvents.length }} eventos
            </span>
          </div>
          <ul class="md:h-[600px] overflow-y-auto px-1 mt-2">
            <li
              class="flex py-1 flex-col"
              v-for="event in currentEvents"
              :key="event.id"
            >
              <div class="group text-left">
                <ModalEventoAgenda>
                  <template #button>
                    <h3
                      class="flex font-mono text-orange-600 group-hover:underline underline-offset-2 justify-between items-center"
                    >
                      {{ event.title }}
                    </h3>
                    <div>
                      <h4
                        class="flex justify-between text-left my-1 items-center"
                      >
                        {{ event.extendedProps.description }}
                      </h4>
                    </div>
                    <div
                      class="flex pt-2 text-sm w-full justify-between items-center"
                    >
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
        </TabPanel>
        <TabPanel
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <FullCalendar :options="calendarOptions">
            <template v-slot:eventContent="arg">
              <div class="flex flex-col overflow-hidden w-full p-2 text-xs">
                <p class="truncate !font-sans">{{ arg.event.title }}</p>
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
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>

  <div
    class="hidden lg:grid md:grid-cols-6 w-full max-w-7xl mx-auto bg-white sm:p-3 gap-1 md:gap-2 mt-2 rounded-xl shadow-lg"
  >
    <div class="md:col-span-2 md:p-2 sm:px-2">
      <div
        class="flex justify-between border-b-2 border-orange-600 pb-2 items-center"
      >
        <h1 class="text-orange-600 font-mono text-2xl flex items-center">
          Agendate
        </h1>
        <span class="font-mono text-gray-500">
          {{ currentEvents.length }} eventos
        </span>
      </div>
      <ul class="md:h-[600px] overflow-y-auto px-1 mt-2">
        <li
          class="flex py-1 flex-col"
          v-for="event in currentEvents"
          :key="event.id"
        >
          <div class="group text-left">
            <ModalEventoAgenda>
              <template #button>
                <h3
                  class="flex font-mono text-orange-600 group-hover:underline underline-offset-2 justify-between items-center"
                >
                  {{ event.title }}
                </h3>
                <div>
                  <h4 class="flex justify-between text-left my-1 items-center">
                    {{ event.extendedProps.description }}
                  </h4>
                </div>
                <div
                  class="flex pt-2 text-sm w-full justify-between items-center"
                >
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
      <div class="p-1">
        <a class="btn w-full green" href="/"> Volver al inicio </a>
      </div>
    </div>
    <div class="md:col-span-4">
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <div class="flex flex-col overflow-hidden w-full p-2 text-xs">
            <p class="truncate !font-sans">{{ arg.event.title }}</p>
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
  @apply font-mono font-normal uppercase text-sm;
}

.fc .fc-daygrid-day-number {
  @apply font-mono font-normal uppercase text-xs;
}

.fc .fc-view-harness {
  height: 660px !important;
}

.fc-toolbar-title {
  @apply font-mono capitalize !text-xs md:!text-lg;
}

.fc .fc-button {
  @apply bg-transparent text-gray-800 p-0.5 px-1.5 flex justify-center items-center;
}

.fc .fc-today-button {
  @apply font-mono disabled:bg-orange-600 p-1 px-2 disabled:border-none disabled:cursor-not-allowed text-sm disabled:text-white bg-white text-gray-600;
}

.fc .fc-event {
  @apply bg-amber-600 border-amber-700 hover:ring-2 ring-orange-300 !important;
  color: #fff;
}
</style>
