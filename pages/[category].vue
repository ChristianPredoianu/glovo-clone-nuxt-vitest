<script setup lang="ts">
const emittedCuisineType = useState<string>('emmitedCuisineType', () => '');

const route = useRoute();

const runtimeConfig = useRuntimeConfig();

const edamamApiEndpoint = `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&dishType=Main%20course`;

const edamamApiFilteredEndpoint = `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&cuisineType=${emittedCuisineType.value}`;

const fakeStoreEndpoint = `https://fakestoreapi.com/products/category/${route.params.category}`;

console.log(edamamApiFilteredEndpoint);

const selectedApiEndpoint = computed(() => {
  return route.query.index !== null && +route.query.index >= 0 && +route.query.index < 3;
});

const { data } = await useFetch(
  () => `${selectedApiEndpoint ? edamamApiEndpoint : fakeStoreEndpoint}`
);

const { data: filteredData } = shouldCallFilteredApi()
  ? useFetch(edamamApiFilteredEndpoint)
  : { data: null };

const { isModalOpen, openModal } = useModal();
const { openBackdrop } = useBackdrop();

function shouldCallFilteredApi() {
  return emittedCuisineType.value !== '' ? true : false;
}

function openFilter() {
  openBackdrop();
  openModal();
}

function handleEmitSelected(selectedCuisineType: string) {
  emittedCuisineType.value = selectedCuisineType;
}
</script>

<template>
  <section class="container mx-auto px-4 mt-10 flex justify-center items-center">
    <Teleport to="body">
      <MealCategoryFilterModal v-if="isModalOpen" @emitSelected="handleEmitSelected" />
    </Teleport>
    <div>
      <font-awesome-icon
        :icon="['fas', 'fa-filter']"
        class="bg-orange-200 p-2 rounded-full text-gray-600 cursor-pointer"
        @click="openFilter"
      />
      <p class="text-xs text-center">Filter</p>
    </div>
  </section>
  <p v-if="filteredData">{{ filteredData }}</p>
  <p v-if="data">{{ data }}</p>

  <!--  <h1>Products in category: {{ $route.params.category }}</h1>
  <h1>Products in category: {{ $route.query.index }}</h1> -->
</template>
