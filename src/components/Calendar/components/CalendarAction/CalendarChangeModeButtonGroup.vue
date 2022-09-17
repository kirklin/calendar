<script setup lang="ts">
import { Dayjs } from "dayjs";
import type { PropType } from "vue";
import type { modeType } from "../../typings/types";

const props = defineProps({
  mode: {
    type: String as PropType<modeType>,
    default: "MONTH",
    required: true,
  },
});
const emits = defineEmits(["onChangeMode"]);
const changeMode = (mode: modeType) => {
  emits("onChangeMode", mode);
};
</script>

<template>
  <button
    class="inline-flex py-2 px-3 border-transparent rounded border items-center text-sm
               justify-center bg-white border-slate-100 hover:border-slate-200
               shadow
               transition transition-colors"
    :class="{
      'text-indigo-500': mode === 'MONTH',
      'text-gray-500': mode !== 'MONTH',
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
      'text-indigo-500': mode === 'WEEK',
      'text-gray-500': mode !== 'WEEK',
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
      'text-indigo-500': mode === 'DAY',
      'text-gray-500': mode !== 'DAY',
    }"
    @click="changeMode('DAY')"
  >
    Day
  </button>
</template>

<style scoped>

</style>
