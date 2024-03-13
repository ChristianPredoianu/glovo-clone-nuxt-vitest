<script setup lang="ts">
const emits = defineEmits(['emitSelected']);

const { closeModal } = useModal();

function closeModalDialog() {
  closeModal();
}

function emitSelected(selectedCuisineType: string) {
  emits('emitSelected', selectedCuisineType);
  console.log(selectedCuisineType);
}
</script>

<template>
  <main
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center z-50 w-full h-full md:h-auto md:w-4/5 bg-white"
  >
    <Backdrop @closeElement="closeModalDialog" />
    <MealCategoryFilterOverlay @emitSelected="emitSelected" />
  </main>
</template>
