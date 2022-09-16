<!--
*  @description: CalendarMonthHeader
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 11:44
 -->
<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 使用本地化语言
import LocaleData from "dayjs/plugin/localeData";
dayjs.extend(LocaleData);
const dayNames = ref(dayjs.weekdays());
</script>

<template>
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
</template>

<style scoped>

</style>
