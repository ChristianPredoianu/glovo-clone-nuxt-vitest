<script setup lang="ts">
import Modal from '@/components/modals/Modal/Modal.vue';

const cartDialog = ref<InstanceType<typeof Modal> | null>(null);
</script>

<template>
  <Modal ref="cartDialog"
    ><CartModalOverlay @closeModal="cartDialog?.closeDialog()"
  /></Modal>
</template>
