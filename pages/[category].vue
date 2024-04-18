<script setup lang="ts">
import Modal from '@/components/modals/Modal/Modal.vue';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { fetchData } from '@/helpers/fetchGenericData';
import type { IMeal, ICuisineType } from '@/interfaces/meals.interface';
import type { IProduct, IFakeStoreCategories } from '@/interfaces/products.interface';

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

const filterDialog = ref<typeof Modal>();
const productDialog = ref<typeof Modal>();

const route = useRoute();
const { initialFetchEndpoint, selectedApiEndpoint } = useEndpoints(
  route.params.category,
  emittedFilter,
  route.query.index as string
);
const { isFakeStoreIndex, getCategoryName } = useFilter();
const { screenWidth } = useScreenWidth();

const { data, pending } = await useFetch<IMeal | IProduct[] | null>(
  initialFetchEndpoint.value
);

async function fetchDataAndUpdate() {
  let result;

  if (emittedFilter.value !== '') {
    filteredData.value.isLoading = true;
    result = await fetchData<IMeal | IProduct[]>(selectedApiEndpoint.value);

    filteredData.value.data = result.data;
    filteredData.value.isLoading = result.isLoading;
  }
}

function isMealData(data: IMeal | IProduct[] | null): data is IMeal {
  return data !== null && 'hits' in data;
}

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

function handleEmitSelected(
  selectedFilter: IFakeStoreCategories | ICuisineType | string
) {
  typeof selectedFilter === 'string'
    ? (emittedFilter.value = '')
    : (emittedFilter.value = getCategoryName(selectedFilter));
}

watch(emittedFilter, fetchDataAndUpdate);
</script>

<template>
  <Modal ref="filterDialog"
    ><FilterModalOverlay
      @emitSelected="handleEmitSelected"
      @closeModal="filterDialog?.closeDialog()"
  /></Modal>
  <Modal ref="productDialog"><ProductModalOverlay /></Modal>
  <div class="container mx-auto px-4">
    <section
      v-if="screenWidth <= 1024"
      class="mt-10 flex justify-center items-center gap-4"
    >
      <RoundedBtn
        @emitClick="filterDialog?.showDialog()"
        text="Filter"
        backCol="bg-orange-200"
        icon="fa-filter"
      />
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
              @click="productDialog?.showDialog()"
            />
          </template>
          <template v-if="shouldRenderFilteredMealCard">
            <MealCard
              v-for="(meal, index) in (filteredData.data as IMeal).hits"
              :key="`meal-${index}`"
              :category="meal.recipe.cuisineType[0]"
              :label="meal.recipe.label"
              :img="meal.recipe.image"
              @click="productDialog?.showDialog()"
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
            @click="productDialog?.showDialog()"
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
            @click="productDialog?.showDialog()"
          />
        </div>
      </div>
    </section>
  </div>
</template>
