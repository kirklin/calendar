<script setup lang="ts">
import { onMounted, ref } from "vue";
import Lang from "./i18n/lang.js"
const month = ref(1);
const year = ref(2022);
const daysInMonth = ref();
const startingBlankDays = ref();
const endingBlankDays = ref();
const monthNames = ref(Lang.zh.monthNames);
const dayNames = ref(Lang.zh.weekNames);
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

const isToday = (date: number) => {
  const today = new Date();
  const day = new Date(year.value, month.value, date);
  return today.toDateString() === day.toDateString();
};

const getEvents = (date: number) => {
  return events.value.filter(e => new Date(e.eventStart).toDateString() === new Date(year.value, month.value, date).toDateString());
};

const getDays = () => {
  const days = new Date(year.value, month.value + 1, 0).getDate();
  console.log("days",days);
  // starting empty cells (previous month)
  const startingDayOfWeek = new Date(year.value, month.value).getDay();
  console.log("startingDayOfWeek",startingDayOfWeek)
  const startingBlankDaysArray = [];
  for (let i = 1; i <= startingDayOfWeek; i++)
    startingBlankDaysArray.push(i);
  console.log("startingBlankDaysArray",startingBlankDaysArray)
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
            <span>{{ `${monthNames[month]} ${year}` }}</span> ✨
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
                <div class="w-1 h-3 ho flex-shrink-0" />
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
          <template v-for="blankday in startingBlankDays">
            <div class="hp h-20 sm:h-24 lg:h-32">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <rect width="100%" height="100%" fill="url(#stripes)" />
              </svg>
            </div>
          </template>

          <!-- Days w-px the current month -->
          <template v-for="(day, dayIndex) in daysInMonth" :key="dayIndex">
            <div class="relative bg-white h-20 sm:h-24 lg:h-32 overflow-hidden">
              <div class="h-full flex flex-col justify-between">
                <!-- Events -->
                <div class="flex-grow flex flex-col relative p-px p-1 overflow-hidden">
                  <template v-for="event in getEvents(day)">
                    <button class="relative w-full text-left mb-1">
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
            </div>
          </template>

          <!-- Empty cells (next month) -->
          <template v-for="blankday in endingBlankDays">
            <div class="hp h-20 sm:h-24 lg:h-32">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <rect width="100%" height="100%" fill="url(#stripes)" />
              </svg>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
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

.hu {
  --tw-bg-opacity: 1;
  background-color: rgb(226 232 240 / var(--tw-bg-opacity))
}

.hp {
  --tw-bg-opacity: 1;
  background-color: rgb(248 250 252 / var(--tw-bg-opacity))
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
