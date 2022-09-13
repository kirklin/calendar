<script setup lang="ts">
import { onMounted, ref } from "vue";
import CalendarMonthHeader from "./components/CalendarHeader/CalendarMonthHeader.vue";
import BlankCell from "./components/Cell/BlankCell.vue";
import EventsCell from "./components/Cell/EventsCell/EventsCell.vue";
import Lang from "./i18n/lang";
import type { localType, modeType } from "./typings/types";
const month = ref(1);
const year = ref(2022);
const week = ref(1);
const day = ref(1);
const locale = ref<localType>("zh");
const calendarMode = ref<modeType>("MONTH");
const daysInMonth = ref();
const startingBlankDays = ref();
const endingBlankDays = ref();
const monthNames = ref(Lang[locale.value].monthNames);
const getDays = () => {
  if (calendarMode.value === "MONTH") {
    const startTime = new Date(year.value, month.value, 1).getDate();
    const endTime = new Date(year.value, month.value + 1, 0).getDate();
    // starting empty cells (previous month)
    const startingDayOfWeek = new Date(year.value, month.value).getDay();
    const startingBlankDaysArray = [];
    for (let i = 1; i <= startingDayOfWeek; i++)
      startingBlankDaysArray.push(i);
    // ending empty cells (next month)
    const endingDayOfWeek = new Date(year.value, month.value + 1, 0).getDay();
    const endingBlankDaysArray = [];
    for (let i = 1; i < 7 - endingDayOfWeek; i++)
      endingBlankDaysArray.push(i);
    // current month cells
    const daysArray = [];
    for (let i = startTime; i <= endTime; i++)
      daysArray.push(i);
    startingBlankDays.value = startingBlankDaysArray;
    endingBlankDays.value = endingBlankDaysArray;
    daysInMonth.value = daysArray;
  }
  else if (calendarMode.value === "WEEK") {
    const startTime = new Date(year.value, month.value, new Date().getDate() - new Date().getDay()).getDate();
    const endTime = new Date(year.value, month.value, new Date().getDate() + 6 - new Date().getDay()).getDate();
    // current month cells
    const daysArray = [];
    for (let i = startTime; i <= endTime; i++)
      daysArray.push(i);
    startingBlankDays.value = [];
    endingBlankDays.value = [];
    daysInMonth.value = daysArray;
  }
  else if (calendarMode.value === "DAY") {
    // current month cells
    startingBlankDays.value = [];
    endingBlankDays.value = [];
    daysInMonth.value = [new Date().getDate()];
  }
};

const getWeekOfYear = () => {
  const today = new Date();
  let firstDay = new Date(today.getFullYear(), 0, 1);
  const dayOfWeek = firstDay.getDay();
  let spendDay = 1;
  if (dayOfWeek !== 0)
    spendDay = 7 - dayOfWeek + 1;

  firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
  const d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
  const result = Math.ceil(d / 7);
  return result + 1;
};
const changeMode = (mode: modeType) => {
  calendarMode.value = mode;
  getDays();
};
const initCalendar = () => {
  const today = new Date();

  month.value = today.getMonth();
  year.value = today.getFullYear();
  week.value = getWeekOfYear();
  day.value = today.getDate();
  getDays();
};
const onPreviousButtonClick = () => {
  if (calendarMode.value === "MONTH") {
    month.value--;
    getDays();
  }
  else if (calendarMode.value === "WEEK") {
    week.value--;
  }
};
const onNextButtonClick = () => {
  if (calendarMode.value === "MONTH") {
    month.value++;
    getDays();
  }
};
onMounted(() => {
  initCalendar();
});
</script>

<template>
  <main>
    <div class="px-4 h-3 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <!-- Page header -->
      <div class="sm:flex sm:justify-between sm:items-center mb-4">
        <!-- Left: Title -->
        <div class="mb-4 h-3:mb-0">
          <h1 class="text-2xl tracking-normal md:text-3xl text-slate-800 font-bold">
            <span v-if="calendarMode === 'MONTH'">{{ `${year} ${monthNames[month]}` }}</span>
            <span v-if="calendarMode === 'WEEK'">{{ `${year} ${week}周` }}</span>
            <span v-if="calendarMode === 'DAY'">{{ `${year} ${monthNames[month]} ${week}周 ${daysInMonth[0]}日` }}</span>
            ✨
          </h1>
        </div>

        <!-- Right: Actions -->
        <div class="grid grid-flow-col h-3:auto-cols-max justify-start h-3:justify-end gap-2">
          <!-- Previous month button -->
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow hover:text-slate-600
               transition transition-colors disabled:cursor-not-allowed"
            :disabled="month === 0" @click="onPreviousButtonClick()"
          >
            <span class="sr-only">Previous month</span><wbr>
            <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
            </svg>
          </button>

          <!-- Next month button -->
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow hover:text-slate-600
               transition transition-colors disabled:cursor-not-allowed"
            :disabled="month === 11" @click="onNextButtonClick()"
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
      </div>

      <!-- Filters and view buttons -->
      <div class="flex justify-between items-center mb-4">
        <!-- Filters  -->
        <div class="mb-4 mb-0 mr-2">
          <ul class="flex flex-wrap items-center -m-1">
            <li class="m-1">
              <button
                class="inline-flex py-1 px-2 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow
               transition transition-colors"
              >
                <div class="w-1 h-3 bg-sky-400 flex-shrink-0" />
                <span class="ml-1">Acme Inc.</span>
              </button>
            </li>
            <li class="m-1">
              <button
                class="inline-flex py-1 px-2 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow
               transition transition-colors"
              >
                <div class="w-1 h-3 bg-green-400 flex-shrink-0" />
                <span class="ml-1">Life &amp; Family</span>
              </button>
            </li>
            <li class="m-1">
              <button
                class="inline-flex py-1 px-2 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow
               transition transition-colors"
              >
                <div class="w-1 h-3 bg-indigo-400 flex-shrink-0" />
                <span class="ml-1">Reservations</span>
              </button>
            </li>
            <li class="m-1">
              <button
                class="inline-flex py-1 px-2 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow
               transition transition-colors"
              >
                <div class="w-1 h-3 bg-red-400 flex-shrink-0" />
                <span class="ml-1">Events</span>
              </button>
            </li>
            <li class="m-1">
              <button
                class="inline-flex py-1 px-2 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-slate-500
               shadow
               transition transition-colors"
              >
                <div class="w-1 h-3 bg-orange-400 flex-shrink-0" />
                <span class="ml-1">Misc</span>
              </button>
            </li>
            <li class="m-1">
              <button
                class="inline-flex py-1 px-2 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 hover:border-slate-300 text-indigo-500
               shadow
               transition transition-colors"
              >
                +Add New
              </button>
            </li>
          </ul>
        </div>

        <!-- View buttons (requires custom integration) -->
        <div class="flex flex-no-wrap">
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-100 hover:border-slate-200
               shadow
               transition transition-colors"
            :class="{
              'text-indigo-500': calendarMode === 'MONTH',
              'text-gray-500': calendarMode !== 'MONTH',
            }"
            @click="changeMode('MONTH')"
          >
            Month
          </button>
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-100 hover:border-slate-200
               shadow
               transition transition-colors"
            :class="{
              'text-indigo-500': calendarMode === 'WEEK',
              'text-gray-500': calendarMode !== 'WEEK',
            }"
            @click="changeMode('WEEK')"
          >
            Week
          </button>
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-100 hover:border-slate-200
               shadow
               transition transition-colors"
            :class="{
              'text-indigo-500': calendarMode === 'DAY',
              'text-gray-500': calendarMode !== 'DAY',
            }"
            @click="changeMode('DAY')"
          >
            Day
          </button>
        </div>
      </div>

      <!-- Calendar table -->
      <div class="bg-white rounded-h-3 shadow overflow-hidden">
        <CalendarMonthHeader />
        <!--        Day cells -->
        <div
          class="grid gap-px bg-gray-200" :class="{
            'grid-cols-7': calendarMode === 'MONTH' | calendarMode === 'WEEK',
            'grid-cols-1': calendarMode === 'DAY',
          }"
        >
          <!-- Diagonal stripes pattern -->
          <svg class="sr-only">
            <defs>
              <pattern id="stripes" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(135)">
                <line class="stroke-current text-gray-200  opacity-50" x1="0" relative="0" x2="0" y2="5" stroke-width="2" />
              </pattern>
            </defs>
          </svg>
          <!-- Empty cells (previous month) -->
          <BlankCell v-for="n in startingBlankDays" :key="n" />

          <!-- Days w-px the current month -->
          <template v-for="(day, dayIndex) in daysInMonth" :key="dayIndex">
            <EventsCell :month="month" :year="year" :day="day" :mode="calendarMode" />
          </template>

          <!-- Empty cells (next month) -->
          <BlankCell v-for="n in endingBlankDays" :key="n" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
