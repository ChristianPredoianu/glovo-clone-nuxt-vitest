<script setup lang="ts">
import type { ModalProps } from '@/interfaces/interfaces.interface';
import { generateRandomPrice } from '@/helpers/randomPrice';

const props = defineProps<{ productModalProps: ModalProps | null; price: number }>();

const price = ref<string | null>(null);

onMounted(() => {
  price.value = generateRandomPrice();
});
</script>

<template>
  <main
    class="container mx-auto py-10 px-4 flex flex-col overflow-auto"
    v-if="productModalProps"
  >
    <div class="">
      <img :src="props.productModalProps!.img" :alt="props.productModalProps!.label" />
    </div>
    <h1 class="text-xl font-semibold text-gray-700 py-4">
      {{ props.productModalProps!.label.replace(/\brecipe\b|\brecipes\b/gi, '').trim() }}
    </h1>

    <h1>{{ props.price }}$</h1>
  </main>
</template>
