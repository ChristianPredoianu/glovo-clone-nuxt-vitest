<script setup lang="ts">
import type { ICartProduct } from '@/interfaces/interfaces.interface';

const { removeFromCart } = useCart();

const props = defineProps<{
  product: ICartProduct;
}>();
</script>

<template>
  <li class="flex flex-col gap-2 border-b border-gray-300 py-4">
    <div class="flex justify-around">
      <img :src="product.img" alt="product image" class="w-16 h-16 rounded-xl" />
      <p class="text-lg font-bold">{{ product.quantity }}x</p>
      <p class="text-center w-3/5">{{ product.label }}</p>
      <p class="">{{ product.price.toFixed(2) }} $</p>
      <p @click="removeFromCart(product.id)">x</p>
    </div>
    <ProductCounter :quantity="product.quantity ?? 0" :product="product" />
  </li>
</template>
