<script setup lang="ts">
const emits = defineEmits(['emitSelected']);

const { closeModal } = useModal();
const { screenWidth } = useScreenWidth();

function closeModalDialog() {
  closeModal();
}

watch(
  () => screenWidth.value,
  () => {
    if (screenWidth.value >= 1024) closeModal();
  }
);

function emitSelected(selectedCuisineType: string) {
  emits('emitSelected', selectedCuisineType);
}
</script>

<template>
  <main
    class="fixed top-0 flex flex-col justify-center items-center z-50 w-full h-full bg-white"
  >
    <Backdrop @closeElement="closeModalDialog" />
    <MealCategoryFilterOverlay @emitSelected="emitSelected" />
  </main>
</template>
