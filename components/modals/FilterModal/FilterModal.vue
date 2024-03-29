<script setup lang="ts">
const emits = defineEmits(['emitSelected']);

function emitSelected(selectedCuisineType: string) {
  emits('emitSelected', selectedCuisineType);
}
</script>

<template>
  <main
    class="modal fixed top-0 flex flex-col justify-center items-center z-50 w-full h-full bg-white"
  >
    <Backdrop />
    <FilterModalOverlay @emitSelected="emitSelected" />
  </main>
</template>
