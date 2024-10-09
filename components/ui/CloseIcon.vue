<script setup lang="ts">
const emits = defineEmits(['closeModal']);
</script>

<template>
  <font-awesome-icon
    :icon="['fas', 'close']"
    class="text-2xl text-right mb-8 font-semibold cursor-pointer"
    @click="emits('closeModal')"
  />
</template>
