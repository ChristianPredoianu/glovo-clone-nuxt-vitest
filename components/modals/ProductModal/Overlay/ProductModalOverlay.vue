<script setup lang="ts">
interface ProductModalProps {
  label: string;
  img: string;
}

const props = defineProps<{
  productModalProps: ProductModalProps | null;
}>();
</script>

<template>
  <main class="container mx-auto py-10 px-4 flex flex-col overflow-auto">
    <h1 v-if="productModalProps">{{ props.productModalProps!.label }}</h1>
    <!--     <img :src="props.img" :alt="props.label" /> -->
    <h1 v-if="props">{{ props }}</h1>
  </main>
</template>
