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
    <dialog ref="dialogRef" class="rounded-lg">
      <slot />
    </dialog>
  </Teleport>
</template>
