<!--
*  @description: CellEvent
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 11:15
 -->
<script setup lang="ts">
import type { PropType } from "vue";
import type { Event } from "../../../../typings/types";

defineProps({
  data: {
    type: Object as PropType<Event>,
    default: undefined,
  },
});
</script>

<template>
  <button class="w-full text-left mb-1">
    <div
      class="px-2 py-px rounded overflow-hidden" :class="[
        {
          'bg-sky-400': data?.eventColor === 'sky',
          'bg-indigo-400': data?.eventColor === 'indigo',
          'bg-yellow-400': data?.eventColor === 'yellow',
          'bg-emerald-400': data?.eventColor === 'emerald',
          'bg-red-400': data?.eventColor === 'red',
        },
      ]"
    >
      <!-- Event name -->
      <div class="text-xs text-white font-semibold truncate leading-tight" v-text="data?.eventName" />
      <div class="text-xs text-white uppercase hidden sm:block truncate">
        <!-- Start date -->
        <template v-if="data?.eventStart">
          <span v-text="data.eventStart.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' })" />
        </template>
        <!-- End date -->
        <template v-if="data?.eventEnd">
          <span> - </span>
          <span v-text="data.eventEnd?.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' })" />
        </template>
      </div>
    </div>
  </button>
</template>

<style scoped>
</style>
