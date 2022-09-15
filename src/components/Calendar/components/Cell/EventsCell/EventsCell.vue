<!--
*  @description: EventsCell
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 10:09
 -->
<script setup lang="ts">
import type { PropType } from "vue";
import type { modeType } from "../../../typings/types";
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
  mode: {
    type: String as PropType<modeType>,
    default: "MONTH",
    required: true,
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

const calCellStyle = (mode: modeType): String => {
  switch (mode) {
    case "MONTH": return "h-20 sm:h-24 lg:h-32 bg-white overflow-hidden";
    case "WEEK": return "h-60 sm:h-72 lg:h-96 bg-white overflow-hidden";
    case "DAY": return "h-60 sm:h-72 lg:h-96 bg-white overflow-hidden";
  }
  return "";
};
</script>

<template>
  <Cell :override-class="calCellStyle(mode)">
    <div class="h-full flex flex-col justify-between">
      <!-- Events -->
      <div class="flex-grow flex flex-col relative p-px p-1 overflow-hidden">
        <template v-for="event in getEvents(day)" :key="event.eventName">
          <CellEvent :data="event" />
        </template>
        <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white pointer-events-none" aria-hidden="true" />
      </div>
      <!-- Month Cell footer -->
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
</style>
