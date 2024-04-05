<script setup lang="ts">
const dialogRef = ref<HTMLDialogElement | null>(null);

function showDialog() {
  dialogRef.value?.showModal();
}

function closeDialog() {
  dialogRef.value?.close();
}

defineExpose({
  showDialog,
  closeDialog,
});
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialogRef">
      <slot />
    </dialog>
  </Teleport>
</template>
