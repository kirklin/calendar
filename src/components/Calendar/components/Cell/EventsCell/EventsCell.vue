<!--
*  @description: EventsCell
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 10:09
 -->
<script setup lang="ts">
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ref } from "vue";
import type { PropType } from "vue";
import type { EventDay, modeType } from "../../../typings/types";
import Cell from "../Cell.vue";
import CellEvent from "./Events/CellEvent.vue";
import { events } from "./Events/data";

defineProps({
  month: {
    type: String,
  },
  year: {
    type: Number,
    default: 2021,
  },
  day: {
    type: Object as PropType<EventDay>,
    required: true,
  },
  mode: {
    type: String as PropType<modeType>,
    default: "MONTH",
    required: true,
  },
  isToday: {
    type: Boolean,
    default: false,
  },
});

const showFooter = ref(true);

interface DayData {
  date: string | number | Date | Dayjs | null | undefined;
  isCurrentMonth: boolean;
}

const getEvents = (day: DayData) => {
  return events.filter((item) => {
    return dayjs(item.eventStart).isSame(dayjs(day.date), "day");
  });
};

const calCellStyle = (mode: modeType): string => {
  switch (mode) {
    case "MONTH":
      return "h-20 sm:h-24 lg:h-32 bg-white overflow-hidden";
    case "WEEK":
      return "h-60 sm:h-72 lg:h-96 bg-white overflow-hidden";
    case "DAY":
      return "h-60 sm:h-72 lg:h-96 bg-white overflow-hidden";
    default:
      return "";
  }
};
</script>

<template>
  <Cell :override-class="calCellStyle(mode)">
    <div class="h-full flex flex-col justify-between">
      <!-- Events -->
      <div
        class="flex-grow flex flex-col relative p-px p-1"
        :class="{ 'overflow-hidden': showFooter === true, 'overflow-auto': showFooter === false }"
      >
        <template v-for="event in getEvents(day)" :key="event.eventName">
          <CellEvent :data="event" />
        </template>
        <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white pointer-events-none" aria-hidden="true" />
      </div>
      <!-- Month Cell footer -->
      <div v-if="showFooter" class="flex justify-between items-center p-px p-1">
        <!-- More button (if more than 2 events) -->
        <template v-if="getEvents(day).length > 2 && mode === 'MONTH'">
          <button
            class="text-xs leading-normal text-slate-500 font-medium whitespace-no-wrap text-center sm:py-px px-px sm:px-2 border border-slate-200 rounded"
            @click="showFooter = false"
          >
            <span class="hidden">+</span><span v-text="getEvents(day).length - 2" /> <span class="hidden md:inline">more</span>
          </button>
        </template>
        <!-- Day number -->
        <button class="inline-flex ml-auto oi so items-center justify-center text-xs leading-normal sm:text-sm font-medium text-center rounded-full xs" :class="{ 'text-indigo-500': isToday }" v-text="dayjs(day.date).date()" />
      </div>
    </div>
  </Cell>
</template>

<style scoped>
</style>
