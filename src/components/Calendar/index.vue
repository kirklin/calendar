<script setup lang="ts">
import { onMounted, ref } from "vue";
import BlankCell from "./components/Cell/BlankCell.vue";
import EventsMonthCell from "./components/Cell/EventsCell/EventsMonthCell.vue";
import Lang from "./i18n/lang.js";
const month = ref(1);
const year = ref(2022);
const daysInMonth = ref();
const startingBlankDays = ref();
const endingBlankDays = ref();
const monthNames = ref(Lang.zh.monthNames);
const dayNames = ref(Lang.zh.weekNames);

const getDays = () => {
  const days = new Date(year.value, month.value + 1, 0).getDate();
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
  for (let i = 1; i <= days; i++)
    daysArray.push(i);

  startingBlankDays.value = startingBlankDaysArray;
  endingBlankDays.value = endingBlankDaysArray;
  daysInMonth.value = daysArray;
};
const initCalendar = () => {
  const today = new Date();

  month.value = today.getMonth();
  year.value = today.getFullYear();
  getDays();
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
            <span>{{ `${year} ${monthNames[month]}` }}</span> ✨
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
            :disabled="month === 0" @click="month--; getDays()"
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
            :disabled="month === 11" @click="month++; getDays()"
          >
            <span class="sr-only">Next month</span><wbr>
            <svg class="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </button>

          <hr class="w-px h-full hu mx-1">

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
                <div class="w-1 h-3 hv flex-shrink-0" />
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
                <div class="w-1 h-3 hd flex-shrink-0" />
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
                <div class="w-1 h-3 hg flex-shrink-0" />
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
                <div class="w-1 h-3 hy flex-shrink-0" />
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
        <div class="flex flex-no-wrap fv">
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 text-indigo-500
               shadow
               transition transition-colors"
          >
            Month
          </button>
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200  text-gray-500
               shadow
               transition transition-colors"
          >
            Week
          </button>
          <button
            class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-200 text-gray-500
               shadow
               transition transition-colors"
          >
            Day
          </button>
        </div>
      </div>

      <!-- Calendar table -->
      <div class="bg-white rounded-h-3 shadow overflow-hidden">
        <!-- Days of the week -->
        <div class="grid grid-cols-7 gap-px border-b border-slate-200">
          <template v-for="(day, index) in dayNames" :key="index">
            <div class="px-1 py-3">
              <div class="text-slate-500 text-h-3 font-medium text-center lg:hidden">
                {{ day.substring(0, 3) }}
              </div>
              <div class="text-slate-500 text-h-3 font-medium text-center hidden lg:block">
                {{ day }}
              </div>
            </div>
          </template>
        </div>

        <!--        Day cells -->
        <div class="grid grid-cols-7 gap-px hu">
          <!-- Diagonal stripes pattern -->
          <svg class="sr-only">
            <defs>
              <pattern id="stripes" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(135)">
                <line class="stroke-current gj opacity-50" x1="0" relative="0" x2="0" y2="5" stroke-width="2" />
              </pattern>
            </defs>
          </svg>
          <!-- Empty cells (previous month) -->
          <BlankCell v-for="n in startingBlankDays" :key="n" />

          <!-- Days w-px the current month -->
          <template v-for="(day, dayIndex) in daysInMonth" :key="dayIndex">
            <EventsMonthCell :month="month" :year="year" :day="day" />
          </template>

          <!-- Empty cells (next month) -->
          <BlankCell v-for="n in endingBlankDays" :key="n" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hu {
  --tw-bg-opacity: 1;
  background-color: rgb(226 232 240 / var(--tw-bg-opacity))
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
.gj {
  --tw-text-opacity: 1;
  color: rgb(226 232 240 / var(--tw-text-opacity));
}
</style>
