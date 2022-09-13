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
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="100%" height="100%" fill="url(#stripes)" />
    </svg>
  </Cell>
</template>

<style scoped>

</style>
