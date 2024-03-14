<script setup lang="ts">
import type { IMeal } from '@/interfaces/meals.interface';

const emittedCuisineType = useState<string>('emmitedCuisineType', () => '');

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { isModalOpen, openModal } = useModal();
const { openBackdrop } = useBackdrop();

const edamamApiEndpoint = `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&dishType=Main%20course`;

const edamamApiFilteredEndpoint = computed(() => {
  return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&cuisineType=${emittedCuisineType.value}`;
});

const fakeStoreEndpoint = `https://fakestoreapi.com/products/category/${route.params.category}`;

const selectedApiEndpoint = computed(() => {
  return route.query.index !== null && +route.query.index >= 0 && +route.query.index < 3;
});

const { data, pending } = await useFetch<IMeal>(
  () => `${selectedApiEndpoint ? edamamApiEndpoint : fakeStoreEndpoint}`
);

const { data: filteredData } = useFetch<IMeal | null>(edamamApiFilteredEndpoint, {});

function shouldCallFakeStoreData() {}

function openFilter() {
  openBackdrop();
  openModal();
}

function handleEmitSelected(selectedCuisineType: string) {
  emittedCuisineType.value = selectedCuisineType;
}

/* watch(emittedCuisineType, (newX) => {
  emittedCuisineType.value = newX;

  edamamApiFilteredEndpoint;
  console.log(filteredData);
}); */
</script>

<template>
  <div class="container mx-auto px-4">
    <section class="mt-10 flex justify-center items-center">
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
    <div class="flex justify-center w-full">
      <!--    <LoadingSpinner v-if="pending || pendingFilteredData" /> -->
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-10 gap-y-8 gap-x-8 mt-8"
    >
      <MealCard
        v-if="data && emittedCuisineType === '' && !pending"
        v-for="meal in data.hits"
        :key="meal.recipe.label"
        :category="meal.recipe.cuisineType[0]"
        :label="meal.recipe.label"
        :img="meal.recipe.image"
      />

      <MealCard
        v-if="filteredData !== null"
        v-for="(meal, index) in filteredData.hits"
        :key="`meal-${index}`"
        :category="meal.recipe.cuisineType[0]"
        :label="meal.recipe.label"
        :img="meal.recipe.image"
      />
    </div>
  </div>
  <!--  <h1>Products in category: {{ $route.params.category }}</h1>
  <h1>Products in category: {{ $route.query.index }}</h1> -->
</template>
