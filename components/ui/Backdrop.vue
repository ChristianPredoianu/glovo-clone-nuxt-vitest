<script setup lang="ts">
const { closeNav } = useNav();
const { isBackdropOpen, closeBackdrop } = useBackdrop(closeNav);
</script>

<template>
  <div
    class="absolute inset-0 min-h-screen w-full bg-slate-800 z-40 opacity-50"
    v-if="isBackdropOpen"
    @click="closeBackdrop"
  ></div>
</template>
