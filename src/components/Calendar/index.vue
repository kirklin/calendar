<script setup lang="ts">
import dayjs from "dayjs";

import "dayjs/locale/zh-cn"; // 使用本地化语言
import WeekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import CalendarButtonSelector from "./components/CalendarAction/CalendarButtonSelector.vue";
import CalendarChangeModeButtonGroup from "./components/CalendarAction/CalendarChangeModeButtonGroup.vue";
import CalendarDayHeader from "./components/CalendarHeader/CalendarDayHeader.vue";
import CalendarMonthHeader from "./components/CalendarHeader/CalendarMonthHeader.vue";
import CalendarWeekHeader from "./components/CalendarHeader/CalendarWeekHeader.vue";
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
        <CalendarButtonSelector :mode="calendarMode" :selected-date="selectedDate" @on-select-date="selectDate" />
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
          <CalendarChangeModeButtonGroup :mode="calendarMode" @on-change-mode="changeMode" />
        </div>
      </div>

      <!-- Calendar table -->
      <div class="bg-white rounded-h-3 shadow overflow-hidden">
        <CalendarMonthHeader v-if="calendarMode === 'MONTH'" />
        <CalendarWeekHeader v-if="calendarMode === 'WEEK'" />
        <CalendarDayHeader v-if="calendarMode === 'DAY'" :day="selectedDate" />
        <!--        Day cells -->
        <div
          class="grid gap-px bg-gray-200" :class="{
            'grid-cols-7': calendarMode === 'MONTH' | calendarMode === 'WEEK',
            'grid-cols-1': calendarMode === 'DAY',
          }"
        >
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
