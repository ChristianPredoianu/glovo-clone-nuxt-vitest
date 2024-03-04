<script setup lang="ts">
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const edamamApiEndpoint = `https://api.edamam.com/api/food-database/v2/parser?app_id=9fa9a650&app_key=%20f0b4d7b6407979c8a1a5a8591dd4637b&nutrition-type=cooking&category=${route.params.category}`;
const fakeStoreEndpoint = `https://fakestoreapi.com/products/category/${route.params.category}`;

const selectedApiEndpoint = computed(() => {
  return route.query.index !== null && +route.query.index >= 0 && +route.query.index < 3;
});

console.log(typeof route.query.index);
const { data } = await useFetch(
  () => `${selectedApiEndpoint ? edamamApiEndpoint : fakeStoreEndpoint}`
);

console.log(route.query.index);
</script>

<template>
  <h1>Products in category: {{ $route.params.category }}</h1>
  <h1>Products in category: {{ $route.query.index }}</h1>
</template>
