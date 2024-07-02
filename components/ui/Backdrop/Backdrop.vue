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
      class="#test fixed inset-0 min-h-full w-full bg-slate-800 z-10 opacity-50"
      v-if="isBackdropOpen"
      @click="closeBackdropElements"
    ></div
  ></Teleport>
</template>
