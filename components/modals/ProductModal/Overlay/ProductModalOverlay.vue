<script setup lang="ts">
import type { ModalProps } from '@/interfaces/interfaces.interface';

const props = defineProps<{ productModalProps: ModalProps | null }>();
</script>

<template>
  <main class="container mx-auto py-10 px-4 flex flex-col overflow-auto">
    <h1 v-if="productModalProps">{{ props.productModalProps!.label }}</h1>
    <!--     <img :src="props.img" :alt="props.label" /> -->
    <h1 v-if="props">{{ props }}</h1>
  </main>
</template>
