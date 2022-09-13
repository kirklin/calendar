<!--
*  @description: CellEvent
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 11:15
 -->
<script setup lang="ts">
interface pros {}
defineProps({
  data: {},
});
</script>

<template>
  <button class="w-full text-left mb-1">
    <div
      class="px-2 py-px rounded overflow-hidden" :class="{
        'bg-sky-400': data.eventColor === 'sky',
        'bg-indigo-400': data.eventColor === 'indigo',
        'bg-yellow-400': data.eventColor === 'yellow',
        'bg-emerald-400': data.eventColor === 'emerald',
        'bg-red-400': data.eventColor === 'red',
      }"
    >
      <!-- Event name -->
      <div class="text-xs text-white leading-normal font-semibold truncate" v-text="data.eventName" />
      <!-- Event time -->
      <div class="text-xs text-white leading-normal uppercase truncate hidden sm:block">
        <!-- Start date -->
        <template v-if="data.eventStart">
          <span v-text="data.eventStart.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' })" />
        </template>
        <!-- End date -->
        <template v-if="data.eventEnd">
          <span>
            - <span v-text="data.eventEnd.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' })" />
          </span>
        </template>
      </div>
    </div>
  </button>
</template>

<style scoped>
</style>
