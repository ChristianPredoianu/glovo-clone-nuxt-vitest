<script setup lang="ts">
const { closeModal } = useModal();

function closeModalDialog() {
  closeModal();
}
</script>

<template>
  <main class="absolute inset-0 mx-auto w-1/2 h-full z-50 bg-red-500">
    <Backdrop @closeElement="closeModalDialog" />
    <MealCategoryFilterOverlay />
  </main>
</template>
