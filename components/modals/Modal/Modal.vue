<script setup lang="ts">
const dialogRef = ref<HTMLDialogElement | null>(null);

const showDialog = () => dialogRef.value?.showModal();
const closeDialog = () => dialogRef.value?.close();

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
