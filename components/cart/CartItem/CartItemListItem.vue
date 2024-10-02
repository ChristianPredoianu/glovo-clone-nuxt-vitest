<script setup lang="ts">
import type { ICartProduct } from '@/interfaces/interfaces.interface';

const props = defineProps<{
  product: ICartProduct;
}>();
</script>

<template>
  <div class="flex bg-red-500 justify-around items-center">
    <img
      :src="product.img"
      alt="product image"
      class="w-16 h-16 rounded-full object-cover"
    />
    <p class="text-lg font-bold">1x</p>
    <p class="text-center w-3/5 bg-blue-500">{{ product.label }}</p>
    <p class="">{{ product.price }} $</p>
  </div>
</template>
