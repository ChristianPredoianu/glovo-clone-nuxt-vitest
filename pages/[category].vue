<script setup lang="ts">
import Modal from '@/components/modals/Modal/Modal.vue';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { fetchData } from '@/helpers/fetchGenericData';
import { generateRandomPrice } from '@/helpers/randomPrice';
import { useIsMealData } from '@/composables/useIsMealData';
import type {
  IMeals,
  ICuisineType,
  IProduct,
  IFakeStoreCategories,
} from '@/interfaces/interfaces.interface';

interface FetchResult<T> {
  data: IMeals | IProduct[] | null;
  isLoading: boolean;
}

const emittedFilter = useState<string>('emmitedFilter', () => '');
const filteredData = useState<FetchResult<IMeals | IProduct[] | null>>(
  'filteredData',
  () => ({
    data: null,
    isLoading: false,
  })
);
const filterDialog = useState<InstanceType<typeof Modal> | null>(
  'filterDialog',
  () => null
);

const productDialog = ref<InstanceType<typeof Modal> | null>(null);

const route = useRoute();
const { isFakeStoreIndex, getCategoryName } = useFilter();
const { screenWidth } = useScreenWidth();
const { isMealData } = useIsMealData();
const { currentModalProps, handleCardClick } = useDialogProps(productDialog);

const { initialFetchEndpoint, selectedApiEndpoint } = useEndpoints(
  route.params.category,
  emittedFilter,
  route.query.index as string
);

const { data, pending } = await useFetch<IMeals | IProduct[] | null>(
  initialFetchEndpoint.value!
);

async function fetchDataAndUpdate() {
  let result;

  if (emittedFilter.value !== '') {
    filteredData.value.isLoading = true;
    result = await fetchData<IMeals | IProduct[]>(selectedApiEndpoint.value!);

    filteredData.value.data = result.data;
    filteredData.value.isLoading = result.isLoading;
  }
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

onBeforeRouteLeave((to, from, next) => {
  emittedFilter.value = '';
  next();
});
</script>

<template>
  <Modal ref="filterDialog"
    ><FilterModalOverlay
      @emitSelected="handleEmitSelected"
      @closeModal="filterDialog?.closeDialog()"
  /></Modal>

  <Modal ref="productDialog"
    ><ProductModalOverlay
      :productModalProps="currentModalProps"
      :price="+generateRandomPrice()"
      @closeModal="productDialog?.closeDialog()"
  /></Modal>
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
        <h1 class="text-xl font-bold md:text-4xl pt-5 lg:py-10">
          {{ capitalizeFirstLetter($route.params.category) }}
          {{ !isFakeStoreIndex ? 'meals' : '' }}
        </h1>
        <h2 v-if="emittedFilter !== ''" class="text-gray-500 text-lg font-semibold mt-1">
          {{ emittedFilter }}
        </h2>
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
              v-for="meal in (data as IMeals).hits"
              :key="meal.recipe.label"
              :category="meal.recipe.cuisineType[0]"
              :label="meal.recipe.label"
              :img="meal.recipe.image"
              @click="handleCardClick(meal)"
            />
          </template>
          <template v-if="shouldRenderFilteredMealCard">
            <MealCard
              v-for="(meal, index) in (filteredData.data as IMeals).hits"
              :key="`meal-${index}`"
              :category="meal.recipe.cuisineType[0]"
              :label="meal.recipe.label"
              :img="meal.recipe.image"
              @click="handleCardClick(meal)"
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
            @click="handleCardClick(product)"
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
            @click="handleCardClick(product)"
          />
        </div>
      </div>
    </section>
  </div>
</template>
