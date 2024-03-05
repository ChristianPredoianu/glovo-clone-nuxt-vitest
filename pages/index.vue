<script setup lang="ts">
import type { IDropdownOptions } from '@/interfaces/options.interface';
import type { ILocationsData, ILocationAdress } from '@/interfaces/locations.interface';
import type { IMeal } from '@/interfaces/meals.interface';
import { productCategories } from '@/data/productCategoriesData';

const emittedInput = useState<string>('emmitedInput', () => '');
const emittedOption = useState<IDropdownOptions>('emittedOption', () => {
  return { id: 0, text: '' };
});

const emittedLocation = useState<string>('emittedLocation', () => '');
let dropdownOptions: IDropdownOptions[] = [];

const runtimeConfig = useRuntimeConfig();

const { data: locationData } = await useFetch<ILocationsData[]>(
  () =>
    `${runtimeConfig.public.apiAutoconfig}pk.a75cdfe1cc307b34218d8021f4122dc6&q=${emittedInput.value}&limit=5`
);

const { data: mealData } = await useFetch<IMeal>(
  () =>
    `https://api.edamam.com/api/recipes/v2?type=public&app_id=e5a7e476&app_key=4b4dc5f4bc65e69c3e05af0392a55b18%09&mealType=Dinner&dishType=Main%20course`
);

function handleEmittedSearchQuery(searchQuery: string) {
  emittedInput.value = searchQuery;
}

const { convertToDropdownOptions } = useConvertToDropdownOptions<ILocationsData>();

function handleEmmitedOption(option: IDropdownOptions) {
  emittedOption.value = option;
}

function handleEmmitedLocation(location: string) {
  console.log(location);
  emittedLocation.value = location;
}

watch(
  () => locationData.value,
  (newValue: ILocationsData[] | null) => {
    newValue
      ? (dropdownOptions = convertToDropdownOptions(newValue))
      : (dropdownOptions = []);
  }
);

watch(
  () => emittedOption.value,
  (newValue: IDropdownOptions | null) => {
    if (newValue !== null) emittedLocation.value = '';
  }
);
</script>

<template>
  <section class="bg-yellow-400 text-gray-800 min-h-screen md:min-h-min">
    <div
      class="container px-4 pt-28 mx-auto flex flex-col items-center justify-center gap-8 p-10 md:flex-row"
    >
      <div class="w-1/2 md:w-1/3">
        <img src="@/assets/food.png" alt="food" class="md:w-1/2" />
      </div>
      <div class="bg-yellow-400 text-center">
        <h1 class="text-2xl font-bold md:text-4xl">Food delivery and more</h1>
        <p class="mt-2 font-medium md:font-xl">
          Groceries, clothing, electronics, anything!
        </p>
        <div class="input-container relative mt-8">
          <AdressForm
            v-if="locationData || dropdownOptions"
            :options="dropdownOptions"
            textKey="text"
            idKey="id"
            @inputRefEmit="handleEmittedSearchQuery"
            @emit-option="handleEmmitedOption"
            @emit-location="handleEmmitedLocation"
          />

          <p
            class="text-sm md:text-lg font-medium mt-4 absolute top-12 left-0"
            v-if="emittedOption.text !== '' || emittedLocation !== ''"
          >
            Deliver to:
            <span class="text-sm md:text-lg font-bold">{{
              emittedLocation !== ''
                ? `${emittedLocation.address.road}, ${emittedLocation.address.town} `
                : emittedOption.text
            }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 mt-10 md:mt-28">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:px-20 md:grid-cols-4 lg:grid-cols-8 gap-y-4 text-center text-green-900"
      >
        <CategoryCard
          v-for="(productCategory, index) in productCategories"
          :key="productCategory.text"
          :index="index"
          :img="productCategory.img"
          :text="productCategory.text"
          :category="productCategory.category"
        />
      </div>
    </div>
  </section>
  <Waves />
  <div class="container mx-auto px-4">
    <section>
      <div class="flex items-center gap-x-2">
        <font-awesome-icon :icon="['fas', 'fa-thumbs-up']" class="text-yellow-400" />
        <h2 class="text-xl font-bold">Meals you might like</h2>
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-y-8 gap-x-8 mt-8"
      >
        <MealCard
          v-if="mealData"
          v-for="meal in mealData.hits"
          :key="meal.recipe.label"
          :category="meal.recipe.cuisineType[0]"
          :label="meal.recipe.label"
          :img="meal.recipe.image"
        />
      </div>
    </section>
    <section>
      <font-awesome-icon
        :icon="['fas', 'fa-check']"
        class="text-7xl mx-auto w-full py-20 text-yellow-400"
      />
    </section>
  </div>
</template>
