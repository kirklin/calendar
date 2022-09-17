<!--
*  @description: BlankCell
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 09:53
 -->
<script setup lang="ts">
import Cell from "./Cell.vue";
</script>

<template>
  <Cell composite-class="bg-gray-50">
    <!-- Diagonal stripes pattern -->
    <svg class="sr-only">
      <defs>
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(135)">
          <line class="stroke-current text-gray-200  opacity-50" x1="0" relative="0" x2="0" y2="5" stroke-width="2" />
        </pattern>
      </defs>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="100%" height="100%" fill="url(#stripes)" />
    </svg>
  </Cell>
</template>

<style scoped>

</style>
