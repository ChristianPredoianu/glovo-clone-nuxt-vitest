<script setup lang="ts">
const { cartProducts } = useCart();
</script>

<template>
  <ul class="w-full" v-for="product in cartProducts" :key="product.id">
    <CartItemListItem :product="product" />
  </ul>
</template>
