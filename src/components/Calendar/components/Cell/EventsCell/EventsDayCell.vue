<!--
*  @description: EventsCell
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 10:09
 -->
<script setup lang="ts">
import { ref } from "vue";
import Cell from "../Cell.vue";
import CellEvent from "./Events/CellEvent.vue";
import { events } from "./Events/data";
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

const getEvents = (date: number) => {
  return events.filter(e => new Date(e.eventStart).toDateString() === new Date(props.year, props.month, date).toDateString());
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
          <CellEvent :data="event" />
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
