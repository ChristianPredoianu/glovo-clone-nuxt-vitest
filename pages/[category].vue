<script setup lang="ts">
import { fakeStoreCategories } from '@/data/productCategoriesData';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { fetchData } from '@/helpers/fetchGenericData';
import type { IMeal } from '@/interfaces/meals.interface';
import type { IProduct } from '@/interfaces/products.interface';
import type { IFakeStoreCategories } from '@/interfaces/products.interface';
import type { ICuisineType } from '@/interfaces/meals.interface';

interface FetchResult<T> {
  data: IMeal | IProduct[] | null;
  isLoading: boolean;
}

const emittedFilter = useState<string>('emmitedFilter', () => '');
const filteredData = useState<FetchResult<IMeal | IProduct[] | null>>(
  'filteredData',
  () => ({
    data: null,
    isLoading: false,
  })
);

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { openModal, isModalOpen } = useModal();
const { isFakeStoreIndex, getCategoryName } = useFilter();
const { openBackdrop } = useBackdrop();
const { screenWidth } = useScreenWidth();

const edamamApiEndpoint = computed(() => {
  return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&dishType=Main%20course`;
});

const edamamApiFilteredEndpoint = computed(() => {
  return `${runtimeConfig.public.apiEdamam}&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=${route.params.category}&cuisineType=${emittedFilter.value}`;
});

const fakeStoreEndpoint = computed(() => {
  return `${runtimeConfig.public.fakeStoreBase}${route.params.category}`;
});

const fakeStoreFilteredEndpoint = computed(() => {
  return `${runtimeConfig.public.fakeStoreBase}${emittedFilter.value.toLowerCase()}`;
});

const initialFetchEndpoint = computed(() => {
  return route.query.index !== null && +route.query.index >= 0 && +route.query.index <= 3
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
    filteredData.value.data !== null &&
    isMealData(filteredData.value.data) &&
    emittedFilter.value !== ''
  );
});

const shouldRenderProducts = computed(() => {
  return data.value !== null && !isMealData(data.value) && emittedFilter.value === '';
});

const shouldRenderFilteredProducts = computed(() => {
  return (
    filteredData.value !== null &&
    !isMealData(filteredData.value.data) &&
    emittedFilter.value !== ''
  );
});

const { data, pending } = await useFetch<IMeal | IProduct[] | null>(
  initialFetchEndpoint.value
);

function isMealData(data: IMeal | IProduct[] | null): data is IMeal {
  return data !== null && 'hits' in data;
}

function openFilter() {
  openBackdrop();
  openModal('filterModal');
}

function handleProductClick() {
  openBackdrop();
  openModal('productModal');
}

function handleEmitSelected(selectedFilter: IFakeStoreCategories | ICuisineType) {
  emittedFilter.value = getCategoryName(selectedFilter);
}

watch(emittedFilter, async () => {
  filteredData.value.isLoading = true;
  const result = await fetchData<IMeal | IProduct[]>(selectedApiEndpoint.value);
  filteredData.value.data = result.data;
  filteredData.value.isLoading = result.isLoading;
});
</script>

<template>
  <div class="container mx-auto px-4">
    <section class="mt-10 flex justify-center items-center gap-4">
      <Teleport to="body">
        <FilterModal
          v-if="isModalOpen('filterModal')"
          @emitSelected="handleEmitSelected"
        />
      </Teleport>
      <Teleport to="body">
        <ProductModal v-if="isModalOpen('productModal')" />
      </Teleport>
      <div v-if="screenWidth <= 1024" class="py-5">
        <RoundedBtn
          @emitClick="openFilter"
          text="Filter"
          backCol="bg-orange-200"
          icon="fa-filter"
        />
      </div>
    </section>
    <section class="flex justify-between">
      <div v-if="screenWidth >= 1024" class="mt-20">
        <MealCategoryFilterList @emitSelected="handleEmitSelected" />
      </div>
      <div class="w-full lg:w-4/5">
        <h1 class="text-xl font-bold md:text-4xl py-5 lg:py-10">
          {{ capitalizeFirstLetter($route.params.category) }}
          {{ !isFakeStoreIndex ? 'meals' : '' }}
        </h1>
        <div
          v-if="pending || filteredData.isLoading"
          class="flex justify-center -mt-40 w-full"
        >
          <LoadingSpinner />
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-8 gap-x-8 mt-8"
        >
          <template v-if="shouldRenderMealCard">
            <MealCard
              v-for="meal in (data as IMeal).hits"
              :key="meal.recipe.label"
              :category="meal.recipe.cuisineType[0]"
              :label="meal.recipe.label"
              :img="meal.recipe.image"
              @click="handleProductClick"
            />
          </template>
          <template v-if="shouldRenderFilteredMealCard">
            <MealCard
              v-for="(meal, index) in (filteredData.data as IMeal).hits"
              :key="`meal-${index}`"
              :category="meal.recipe.cuisineType[0]"
              :label="meal.recipe.label"
              :img="meal.recipe.image"
              @click="handleProductClick"
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
            @click="handleProductClick"
          />
        </div>

        <div
          v-if="shouldRenderFilteredProducts"
          class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-y-8 gap-x-8 mt-8"
        >
          <ProductCard
            v-for="product in (filteredData.data as IProduct[])"
            :key="product.id"
            :product="product"
            @click="handleProductClick"
          />
        </div>
      </div>
    </section>
  </div>

  <h1>Products in category: {{ $route.params.category }}</h1>
  <h1>Products in category: {{ $route.query.index }}</h1>
</template>
