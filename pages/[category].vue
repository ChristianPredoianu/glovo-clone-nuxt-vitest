<script setup lang="ts">
import { fakeStoreCategories } from '@/data/productCategoriesData';
import { fakeStoreBase } from '@/helpers/apiEndpoints';
import type { IMeal } from '@/interfaces/meals.interface';
import type { IProduct } from '@/interfaces/products.interface';

const emittedFilter = useState<string>('emmitedFilter', () => '');
const filteredData = useState<IMeal | IProduct[] | null>('filteredData', () => null);

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { isModalOpen, openModal } = useModal();
const { openBackdrop } = useBackdrop();
const { screenWidth } = useScreenWidth();

const edamamApiEndpoint = computed(() => {
  return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&dishType=Main%20course`;
});

const edamamApiFilteredEndpoint = computed(() => {
  return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&cuisineType=${emittedFilter.value}`;
});

const fakeStoreEndpoint = computed(() => {
  return `${fakeStoreBase}${route.params.category}`;
});

const fakeStoreFilteredEndpoint = computed(() => {
  return `${fakeStoreBase}${emittedFilter.value.toLowerCase()}`;
});

const initialFetchEndpoint = computed(() => {
  return route.query.index !== null && +route.query.index >= 0 && +route.query.index < 3
    ? edamamApiEndpoint.value
    : fakeStoreEndpoint.value;
});

const selectedApiEndpoint = computed(() => {
  const shouldFetchFromFakeStore = fakeStoreCategories.some(
    (category) => category.category.toLowerCase() === emittedFilter.value.toLowerCase()
  );

  return shouldFetchFromFakeStore
    ? fakeStoreFilteredEndpoint.value
    : edamamApiFilteredEndpoint.value;
});

const shouldRenderMealCard = computed(() => {
  return data.value !== null && isMealData(data.value) && emittedFilter.value === '';
});

const shouldRenderFilteredMealCard = computed(() => {
  return (
    filteredData.value !== null &&
    isMealData(filteredData.value) &&
    emittedFilter.value !== ''
  );
});

const shouldRenderProducts = computed(() => {
  return data.value !== null && !isMealData(data.value) && emittedFilter.value === '';
});

const shouldRenderFilteredProducts = computed(() => {
  return (
    filteredData.value !== null &&
    !isMealData(filteredData.value) &&
    emittedFilter.value !== ''
  );
});

const { data, pending } = await useFetch<IMeal | IProduct[] | null>(
  initialFetchEndpoint.value
);

async function fetchData() {
  const response = await fetch(selectedApiEndpoint.value);
  filteredData.value = await response.json();
}

function isMealData(data: IMeal | IProduct[] | null): data is IMeal {
  return data !== null && 'hits' in data;
}

function openFilter() {
  openBackdrop();
  openModal();
}

function handleEmitSelected(selectedCuisineType: string) {
  emittedFilter.value = selectedCuisineType;
}

watch(emittedFilter, () => {
  fetchData();
});
</script>

<template>
  <div class="container mx-auto px-4">
    <section class="mt-10 flex justify-center items-center">
      <Teleport to="body">
        <MealCategoryFilterModal v-if="isModalOpen" @emitSelected="handleEmitSelected" />
      </Teleport>
      <div v-if="screenWidth <= 1024" class="py-5">
        <font-awesome-icon
          :icon="['fas', 'fa-filter']"
          class="bg-orange-200 p-2 rounded-full text-gray-600 cursor-pointer"
          @click="openFilter"
        />
        <p class="text-xs text-center">Filter</p>
      </div>
    </section>
    <section class="flex justify-between">
      <div v-if="screenWidth >= 1024" class="mt-20">
        <MealCategoryFilterList @emitSelected="handleEmitSelected" />
      </div>
      <div class="w-full lg:w-4/5">
        <h1 class="text-2xl font-bold md:text-4xl py-5 lg:py-10">
          {{ $route.params.category }} meals
        </h1>
        <div v-if="pending" class="flex justify-center w-full">
          <LoadingSpinner />
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4 2xl:grid-cols-6 gap-y-8 gap-x-8 mt-8"
        >
          <template v-if="shouldRenderMealCard">
            <MealCard
              v-for="meal in (data as IMeal).hits"
              :key="meal.recipe.label"
              :category="meal.recipe.cuisineType[0]"
              :label="meal.recipe.label"
              :img="meal.recipe.image"
            />
          </template>
          <template v-if="shouldRenderFilteredMealCard">
            <MealCard
              v-for="(meal, index) in (filteredData as IMeal).hits"
              :key="`meal-${index}`"
              :category="meal.recipe.cuisineType[0]"
              :label="meal.recipe.label"
              :img="meal.recipe.image"
            />
          </template>
        </div>

        <div
          v-if="shouldRenderProducts"
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-y-8 gap-x-8 mt-8"
        >
          <ProductCard
            v-for="product in (data as IProduct[])"
            :key="product.id"
            :product="product"
          />
        </div>

        <div
          v-if="shouldRenderFilteredProducts"
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-y-8 gap-x-8 mt-8"
        >
          <ProductCard
            v-for="product in (filteredData as IProduct[])"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>

  <h1>Products in category: {{ $route.params.category }}</h1>
  <h1>Products in category: {{ $route.query.index }}</h1>
</template>
