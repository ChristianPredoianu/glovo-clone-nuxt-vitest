<script setup lang="ts">
const emits = defineEmits(['closeElement']);

const { isBackdropOpen, closeBackdrop } = useBackdrop();

function closeBackdropElements() {
  closeBackdrop();
  emits('closeElement');
}
</script>

<template>
  <Teleport to="body">
    <div
      class="#test absolute inset-0 min-h-screen w-full bg-slate-800 z-40 opacity-50"
      v-if="isBackdropOpen"
      @click="closeBackdropElements"
    ></div
  ></Teleport>
</template>
