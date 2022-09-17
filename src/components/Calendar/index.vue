<script setup lang="ts">
import { computed, ref } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 使用本地化语言
import WeekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import CalendarMonthHeader from "./components/CalendarHeader/CalendarMonthHeader.vue";
import BlankCell from "./components/Cell/BlankCell.vue";
import EventsCell from "./components/Cell/EventsCell/EventsCell.vue";
import type { modeType } from "./typings/types";
dayjs.locale("zh-cn");
dayjs.extend(WeekOfYear);
dayjs.extend(weekday);
const calendarMode = ref<modeType>("MONTH");

const selectedDate = ref(dayjs());
const today = computed(() => {
  return dayjs().format("YYYY-MM-DD");
});

const month = computed(() => {
  return selectedDate.value.format("M");
});

const year = computed(() => {
  return selectedDate.value.year();
});

const week = computed(() => {
  return selectedDate.value.week();
});

// 一个月中的天数
const daysInMonth = computed(() => {
  return dayjs(selectedDate.value).daysInMonth();
});

const changeMode = (mode: modeType) => {
  calendarMode.value = mode;
};
const getWeekday = (date: dayjs.ConfigType) => {
  return dayjs(date).weekday();
};
const todayCellData = computed(() => {
  return {
    date: selectedDate.value.format("YYYY-MM-DD"),
    isCurrentMonth: selectedDate.value.month() === dayjs(today.value).month(),
  };
});
const currentMonthDays = computed(() => {
  return [...Array(daysInMonth.value)].map((day, index) => {
    return {
      date: dayjs(`${year.value}-${month.value}-${index + 1}`).format(
        "YYYY-MM-DD",
      ),
      isCurrentMonth: true,
    };
  });
});
const previousMonthDays = computed(() => {
  // 获取第一天是星期几(从0开始)
  const firstDayOfTheMonthWeekday = dayjs(currentMonthDays.value[0].date).day();
  // 上一个月
  const previousMonth = dayjs(`${year.value}-${month.value}-01`).subtract(
    1,
    "month",
  );
  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays.value[0].date,
  )
    .subtract(firstDayOfTheMonthWeekday, "day")
    .date();

  return [...Array(firstDayOfTheMonthWeekday)].map(
    (day, index) => {
      return {
        date: dayjs(
              `${previousMonth.year()}-${previousMonth.month()
              + 1}-${previousMonthLastMondayDayOfMonth + index}`,
        ).format("YYYY-MM-DD"),
        isCurrentMonth: false,
      };
    },
  );
});

const nextMonthDays = computed(() => {
  const lastDayOfTheMonthWeekday = dayjs(currentMonthDays.value[currentMonthDays.value.length - 1].date).day();
  const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
      ).format("YYYY-MM-DD"),
      isCurrentMonth: false,
    };
  });
});

const currentWeekDays = computed(() => {
  return [...Array(7)].map((day, index) => {
    return {
      date: selectedDate.value.day(index).format("YYYY-MM-DD"),
      isCurrentMonth: selectedDate.value.day(index).month() === dayjs(today.value).month(),
    };
  });
});

const calendarMonthCellDays = computed(() => {
  return [...previousMonthDays.value, ...currentMonthDays.value, ...nextMonthDays.value];
});

const selectDate = (newSelectedDate: dayjs.Dayjs) => {
  selectedDate.value = newSelectedDate;
};
const selectPrevious = () => {
  let newSelectedDate;
  if (calendarMode.value === "MONTH")
    newSelectedDate = dayjs(selectedDate.value).subtract(1, "month");
  else if (calendarMode.value === "WEEK")
    newSelectedDate = dayjs(selectedDate.value).subtract(1, "week");
  else if (calendarMode.value === "DAY")
    newSelectedDate = dayjs(selectedDate.value).subtract(1, "day");
  else newSelectedDate = dayjs(selectedDate.value).subtract(0, "day");
  selectDate(newSelectedDate);
};
const selectCurrent = () => {
  const newSelectedDate = dayjs(today.value);
  selectDate(newSelectedDate);
};
const selectNext = () => {
  let newSelectedDate;
  if (calendarMode.value === "MONTH")
    newSelectedDate = dayjs(selectedDate.value).add(1, "month");
  else if (calendarMode.value === "WEEK")
    newSelectedDate = dayjs(selectedDate.value).add(1, "week");
  else if (calendarMode.value === "DAY")
    newSelectedDate = dayjs(selectedDate.value).add(1, "day");
  else newSelectedDate = dayjs(selectedDate.value).subtract(0, "day");
  selectDate(newSelectedDate);
};
</script>

<template>
  <main>
    <div class="px-4 h-3 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <!-- Page header -->
      <div class="sm:flex sm:justify-between sm:items-center mb-4">
        <!-- Left: Title -->
        <div class="mb-4 h-3:mb-0">
          <h1 class="text-2xl tracking-normal md:text-3xl text-slate-800 font-bold">
            <span>{{ selectedDate.format("YYYY MMMM") }}</span>
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
            @click="selectPrevious()"
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
          <template v-if="calendarMode === 'MONTH'">
            <!-- Empty cells (previous month) -->
            <BlankCell v-for="day in previousMonthDays" :key="day.date" />

            <!-- Days w-px the current month -->
            <template v-for="day in currentMonthDays" :key="day.date">
              <EventsCell :month="month" :year="year" :day="day" :mode="calendarMode" :is-today="day.date === today" />
            </template>

            <!-- Empty cells (next month) -->
            <BlankCell v-for="day in nextMonthDays" :key="day.date" />
          </template>
          <template v-if="calendarMode === 'WEEK'">
            <!-- Days w-px the current month -->
            <template v-for="day in currentWeekDays" :key="day.date">
              <EventsCell :month="month" :year="year" :day="day" :mode="calendarMode" :is-today="day.date === today" />
            </template>
          </template>
          <template v-if="calendarMode === 'DAY'">
            <!-- Days w-px the current month -->
            <EventsCell :month="month" :year="year" :day="todayCellData" :mode="calendarMode" :is-today="todayCellData.date === today" />
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
