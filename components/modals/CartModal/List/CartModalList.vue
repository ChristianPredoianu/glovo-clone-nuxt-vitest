<script setup lang="ts">
const { cartProducts } = useCart();
const { removeFromCart } = useCart();
</script>

<template>
  <ul class="w-full">
    <li
      v-for="product in cartProducts"
      :key="product.id"
      class="flex flex-col gap-2 border-b border-gray-300 py-4"
    >
      <div class="flex flex-col gap-4 justify-around items-center md:flex-row">
        <img :src="product.img" alt="product image" class="w-12 h-12 rounded-xl" />
        <p class="text-lg font-bold ml-1">{{ product.quantity }}x</p>
        <p class="text-sm text-center w-1/2">{{ product.label }}</p>
        <p class="font-semibold">{{ product.price.toFixed(2) }} $</p>
        <p @click="removeFromCart(product.id)">x</p>
      </div>
      <ProductCounter :quantity="product.quantity ?? 0" :product="product" />
    </li>
  </ul>
</template>
