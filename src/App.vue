<script setup lang="ts">
import { logLabeled } from "./utils/logger";
logLabeled("I'm ready!  ⸜(๑'ᵕ'๑)⸝⋆*", "log", "", "color: #66ccff");
</script>

<template>
  <div class="font-chinese antialiased bg-gray-100">
    <div class="min-h-screen">
      <RouterView />
    </div>
  </div>
</template>
