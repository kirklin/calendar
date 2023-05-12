<!--
*  @description: CalendarMonthHeader
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 11:44
 -->
<script setup lang="ts">
import dayjs from "dayjs";

import "dayjs/locale/zh-cn"; // 使用本地化语言
import LocaleData from "dayjs/plugin/localeData";

defineProps({
  day: dayjs.Dayjs,
});

dayjs.extend(LocaleData);
</script>

<template>
  <!-- Day Header -->
  <div class="grid grid-cols-1 gap-px border-b border-slate-200">
    <div class="px-1 py-3">
      <div class="text-slate-500 text-h-3 font-medium text-center hidden lg:block">
        {{ day.format("YYYY-MM-DD") }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
