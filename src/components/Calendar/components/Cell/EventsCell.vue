<!--
*  @description: EventsCell
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 10:09
 -->
<script setup lang="ts">
import { ref } from "vue";
import Cell from "./Cell.vue";
const props = defineProps({
  month: {
    type: Number,
    default: 1,
  },
  year: {
    type: Number,
    default: 2021,
  },
  day: {
    type: Number,
  },
});
const events = ref([
  // Previous month
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 8, 3),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 8, 7),
    eventName: "⛱️ Relax for 2 at Marienbad",
    eventColor: "indigo",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 12, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 11),
    eventName: "Team Catch-up",
    eventColor: "sky",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 18, 2),
    eventEnd: "",
    eventName: "✍️ New Project (2)",
    eventColor: "yellow",
  },
  // Current month
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 11),
    eventName: "Meeting w/ Patrick Lin",
    eventColor: "sky",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 19),
    eventEnd: "",
    eventName: "Reservation at La Ginestre",
    eventColor: "indigo",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 3, 9),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 3, 10),
    eventName: "✍️ New Project",
    eventColor: "yellow",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 7, 21),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 7, 22),
    eventName: "⚽ 2021 - Semi-final",
    eventColor: "red",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 11),
    eventName: "Meeting w/Carolyn",
    eventColor: "sky",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 13),
    eventEnd: "",
    eventName: "Pick up Marta at school",
    eventColor: "emerald",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 14),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 15),
    eventName: "Meeting w/ Patrick Lin",
    eventColor: "emerald",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 9, 19),
    eventEnd: "",
    eventName: "Reservation at La Ginestre",
    eventColor: "indigo",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 11, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 11, 11),
    eventName: "⛱️ Relax for 2 at Marienbad",
    eventColor: "indigo",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 11, 19),
    eventEnd: "",
    eventName: "⚽ 2021 - Semi-final",
    eventColor: "red",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 14, 11),
    eventName: "Team Catch-up",
    eventColor: "sky",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 2),
    eventEnd: "",
    eventName: "Pick up Marta at school",
    eventColor: "emerald",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 3),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 21, 7),
    eventName: "✍️ New Project (2)",
    eventColor: "yellow",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 11),
    eventName: "Team Catch-up",
    eventColor: "sky",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 19),
    eventEnd: "",
    eventName: "⚽ 2021 - Semi-final",
    eventColor: "red",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 23, 0),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 23, 23),
    eventName: "You stay at Meridiana B&B",
    eventColor: "indigo",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 11),
    eventName: "Meeting w/ Kylie Joh",
    eventColor: "sky",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth(), 29, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 29, 11),
    eventName: "Call Request ->",
    eventColor: "sky",
  },
  // Next month
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2, 3),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2, 7),
    eventName: "✍️ New Project (2)",
    eventColor: "yellow",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 14, 10),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth(), 14, 11),
    eventName: "Team Catch-up",
    eventColor: "sky",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 25, 2),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 25, 3),
    eventName: "Pick up Marta at school",
    eventColor: "emerald",
  },
  {
    eventStart: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 27, 21),
    eventEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 27, 22),
    eventName: "⚽ 2021 - Semi-final",
    eventColor: "red",
  },
]);

const getEvents = (date: number) => {
  return events.value.filter(e => new Date(e.eventStart).toDateString() === new Date(props.year, props.month, date).toDateString());
};

const isToday = (date: number) => {
  const today = new Date();
  const day = new Date(props.year, props.month, date);
  return today.toDateString() === day.toDateString();
};
</script>

<template>
  <Cell composite-class="bg-white overflow-hidden">
    <div class="h-full flex flex-col justify-between">
      <!-- Events -->
      <div class="flex-grow flex flex-col relative p-px p-1 overflow-hidden">
        <template v-for="event in getEvents(day)" :key="event.eventName">
          <button class="w-full text-left mb-1">
            <div
              class="px-2 py-px rounded overflow-hidden" :class="{
                'ye hv': event.eventColor === 'sky',
                'ye ho': event.eventColor === 'indigo',
                'ye hy': event.eventColor === 'yellow',
                'ye hd': event.eventColor === 'emerald',
                'ye hg': event.eventColor === 'red',
              }"
            >
              <!-- Event name -->
              <div class="text-xs text-white leading-normal font-semibold truncate" v-text="event.eventName" />
              <!-- Event time -->
              <div class="text-xs text-white leading-normal uppercase truncate hidden sm:block">
                <!-- Start date -->
                <template v-if="event.eventStart">
                  <span v-text="event.eventStart.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' })" />
                </template>
                <!-- End date -->
                <template v-if="event.eventEnd">
                  <span>
                    - <span v-text="event.eventEnd.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' })" />
                  </span>
                </template>
              </div>
            </div>
          </button>
        </template>
        <div class="absolute bottom-0 left-0 right-0 h-4 pl pp pj pointer-events-none" aria-hidden="true" />
      </div>
      <!-- Cell footer -->
      <div class="flex justify-between items-center p-px p-1">
        <!-- More button (if more than 2 events) -->
        <template v-if="getEvents(day).length > 2">
          <button class="text-xs leading-normal text-slate-500 font-medium whitespace-no-wrap text-center sm:py-px px-px sm:px-2 border border-slate-200 rounded">
            <span class="hidden">+</span><span v-text="getEvents(day).length - 2" /> <span class="hidden md:inline">more</span>
          </button>
        </template>
        <!-- Day number -->
        <button class="inline-flex ml-auto oi so items-center justify-center text-xs leading-normal sm:text-sm  font-medium text-center rounded-full xs" :class="{ 'text-indigo-500': isToday(day) }" v-text="day" />
      </div>
    </div>
  </Cell>
</template>

<style scoped>
.pj {
  --tw-gradient-to: transparent;
}
.pp {
  --tw-gradient-from: #fff;
  --tw-gradient-to: rgb(255 255 255 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.pl {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
}

.hd {
  --tw-bg-opacity: 1;
  background-color: rgb(16 185 129 / var(--tw-bg-opacity))
}

.hv {
  --tw-bg-opacity: 1;
  background-color: rgb(14 165 233 / var(--tw-bg-opacity))
}

.hg {
  --tw-bg-opacity: 1;
  background-color: rgb(251 113 133 / var(--tw-bg-opacity))
}

.hy {
  --tw-bg-opacity: 1;
  background-color: rgb(245 158 11 / var(--tw-bg-opacity))
}

.ho {
  --tw-bg-opacity: 1;
  background-color: rgb(99 102 241 / var(--tw-bg-opacity))
}
</style>
