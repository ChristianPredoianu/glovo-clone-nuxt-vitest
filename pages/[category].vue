<script setup lang="ts">
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const edamamApiEndpoint = `${runtimeConfig.public.apiEdamam}
                            &app_id=e5a7e476
                            &app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09
                            &mealType=${route.params.category}&dishType=Main%20course`;
const fakeStoreEndpoint = `https://fakestoreapi.com/products/category/${route.params.category}`;

const selectedApiEndpoint = computed(() => {
  return route.query.index !== null && +route.query.index >= 0 && +route.query.index < 3;
});

const { data } = await useFetch(
  () => `${selectedApiEndpoint ? edamamApiEndpoint : fakeStoreEndpoint}`
);
</script>

<template>
  <h1>Products in category: {{ $route.params.category }}</h1>
  <h1>Products in category: {{ $route.query.index }}</h1>
</template>
