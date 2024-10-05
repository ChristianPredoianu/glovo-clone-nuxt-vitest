<script setup lang="ts">
const dialogRef = ref<HTMLDialogElement | null>(null);

function showDialog() {
  dialogRef.value?.showModal();
}

function closeDialog() {
  dialogRef.value?.close();
}

function closeDialogOnClickOutside(e: MouseEvent) {
  if (e.target === dialogRef.value) closeDialog();
}

onMounted(() => {
  dialogRef.value?.addEventListener('click', closeDialogOnClickOutside);
});

onUnmounted(() => {
  dialogRef.value?.removeEventListener('click', closeDialogOnClickOutside);
});

defineExpose({
  showDialog,
  closeDialog,
});
</script>

<template>
  <Teleport to="body">
    <dialog class="rounded-lg" ref="dialogRef" id="main-dialog">
      <slot />
    </dialog>
  </Teleport>
</template>

<style scoped>
#main-dialog::backdrop {
  background-color: #1d1d1d;
  opacity: 0.7;
}
</style>
