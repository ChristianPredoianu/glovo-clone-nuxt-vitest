<script setup lang="ts">
const emits = defineEmits(['clicked']);
</script>

<template>
  <button
    class="bg-green-600 py-3 px-10 rounded-xl text-gray-100 font-bold cursor-pointer hover:bg-green-700"
    @click="emits('clicked')"
  >
    <slot></slot>
  </button>
</template>
