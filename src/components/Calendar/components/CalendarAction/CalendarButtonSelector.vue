<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs";
import type { PropType } from "vue";
import type { modeType } from "../../typings/types";
const props = defineProps({
  mode: {
    type: String as PropType<modeType>,
    default: "MONTH",
    required: true,
  },
  selectedDate: {
    type: Dayjs,
    required: true,
  },
});
const emits = defineEmits(["onSelectDate"]);
const selectDate = (newSelectedDate: Dayjs) => {
  emits("onSelectDate", newSelectedDate);
};
const selectPrevious = () => {
  let newSelectedDate;
  if (props.mode === "MONTH")
    newSelectedDate = dayjs(props.selectedDate).subtract(1, "month");
  else if (props.mode === "WEEK")
    newSelectedDate = dayjs(props.selectedDate).subtract(1, "week");
  else if (props.mode === "DAY")
    newSelectedDate = dayjs(props.selectedDate).subtract(1, "day");
  else newSelectedDate = dayjs(props.selectedDate).subtract(0, "day");
  selectDate(newSelectedDate);
};
const selectCurrent = () => {
  const newSelectedDate = dayjs();
  selectDate(newSelectedDate);
};
const selectNext = () => {
  let newSelectedDate;
  if (props.mode === "MONTH")
    newSelectedDate = dayjs(props.selectedDate).add(1, "month");
  else if (props.mode === "WEEK")
    newSelectedDate = dayjs(props.selectedDate).add(1, "week");
  else if (props.mode === "DAY")
    newSelectedDate = dayjs(props.selectedDate).add(1, "day");
  else newSelectedDate = dayjs(props.selectedDate).subtract(0, "day");
  selectDate(newSelectedDate);
};
</script>

<template>
  <div class="grid grid-flow-col h-3:auto-cols-max justify-start h-3:justify-end gap-2">
    <!-- Previous month button -->
    <button
      class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow hover:text-slate-600
               transition transition-colors disabled:cursor-not-allowed"
      @click="selectPrevious()"
    >
      <span class="sr-only">Previous month</span><wbr>
      <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
        <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
      </svg>
    </button>
    <!-- Today button -->
    <button
      class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow hover:text-slate-600
               transition transition-colors disabled:cursor-not-allowed"
      @click="selectCurrent()"
    >
      <span>Today</span>
    </button>
    <!-- Next month button -->
    <button
      class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow hover:text-slate-600
               transition transition-colors disabled:cursor-not-allowed"
      @click="selectNext()"
    >
      <span class="sr-only">Next month</span><wbr>
      <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
      </svg>
    </button>

    <hr class="w-px h-full bg-gray-200 mx-1">

    <!-- Create event button -->
    <button
      class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center hover:bg-indigo-500 bg-blue-500
               shadow hover:text-slate-600
               transition transition-colors disabled:cursor-not-allowed"
    >
      <svg class="w-4 h-4 fill-white opacity-50 flex-shrink-0" viewBox="0 0 16 16">
        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
      </svg>
      <span class="hidden text-white sm:block ml-1">Create Event</span>
    </button>
  </div>
</template>

<style scoped>

</style>
