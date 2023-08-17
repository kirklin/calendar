<!--
*  @description: Cell
*  @Author: Kirk lin
*  @createdTime: 2022-09-13 09:57
 -->
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps({
  overrideClass: String,
  compositeClass: {
    type: String,
    default: "",
    required: false,
  },
});
onMounted(() => {
});
const CellClass = ref();
watchEffect(() => {
  if (props.overrideClass) {
    CellClass.value = props.overrideClass;
  } else {
    CellClass.value = `h-20 sm:h-24 lg:h-32 ${props.compositeClass}`;
  }
});
</script>

<template>
  <div :class="CellClass">
    <slot />
  </div>
</template>

<style scoped>

</style>
