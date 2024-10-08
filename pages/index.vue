<script setup lang="ts">
import Modal from '@/components/modals/Modal/Modal.vue';
import type {
  ILocationsData,
  ILocationAdress,
  ICountriesData,
  IMeals,
  IDropdownOptions,
} from '@/interfaces/interfaces.interface';
import { productCategories, dishTypes } from '@/data/productCategoriesData';
import { generateRandomPrice } from '~/helpers/randomPrice';

const emittedInput = useState<string>('emmitedInput', () => '');
const emittedOption = useState<IDropdownOptions>('emittedOption', () => {
  return { id: 0, text: '' };
});

const productDialog = ref<InstanceType<typeof Modal> | null>(null);

const emittedLocation = useState<ILocationAdress>('emittedLocation', () => {
  return { address: { road: '', postcode: '', town: '', country: '' } };
});

let dropdownOptions: IDropdownOptions[] = [];

const { locationEndpoint, indexMealDataEndpoint, restCountriesEndpoint } = useEndpoints(
  undefined,
  emittedInput,
  undefined
);

const { convertToDropdownOptions } = useConvertToDropdownOptions<ILocationsData>();
const { currentModalProps, handleCardClick } = useDialogProps(productDialog);

const { data: locationData } = await useFetch<ILocationsData[]>(
  () => `${locationEndpoint.value}`
);

const { data: mealData } = await useFetch<IMeals>(() => `${indexMealDataEndpoint.value}`);

const { data: countriesData } = await useFetch<ICountriesData[]>(
  () => `${restCountriesEndpoint}`
);

function handleEmittedSearchQuery(searchQuery: string) {
  emittedInput.value = searchQuery;
}

function handleEmmitedOption(option: IDropdownOptions) {
  emittedOption.value = option;
}

function handleEmmitedLocation(location: ILocationAdress) {
  emittedLocation.value = location;
}

function checkIfLocation() {
  return emittedOption.value.text !== '' || emittedLocation.value.address.road !== '';
}

function checkLocationOutput() {
  return emittedLocation.value.address.road !== ''
    ? `${emittedLocation.value.address.road}, 
                  ${emittedLocation.value.address.postcode}, 
                  ${emittedLocation.value.address.town}, 
                  ${emittedLocation.value.address.country}`
    : emittedOption.value.text;
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
    if (newValue !== null) emittedLocation.value.address.road = '';
  }
);
</script>

<template>
  <Modal ref="productDialog"
    ><ProductModalOverlay
      :productModalProps="currentModalProps"
      :price="+generateRandomPrice()"
      @closeModal="productDialog?.closeDialog()"
  /></Modal>
  <section class="bg-amber-400 text-gray-800 min-h-screen md:min-h-min">
    <div
      class="container px-4 pt-28 mx-auto flex flex-col items-center justify-center gap-8 p-10 md:flex-row"
    >
      <div class="w-1/2 md:w-1/3">
        <img src="@/assets/food.png" alt="food" class="md:w-1/2" />
      </div>
      <div class="bg-amber-400 text-center">
        <h1 class="text-2xl font-bold md:text-4xl">Food delivery and more</h1>
        <p class="mt-2 font-medium md:font-xl">
          Groceries, clothing, electronics, anything!
        </p>
        <div class="input-container relative mt-8">
          <AddressForm
            v-if="locationData || dropdownOptions"
            :options="dropdownOptions"
            textKey="text"
            idKey="id"
            @emitInput="handleEmittedSearchQuery"
            @emitOption="handleEmmitedOption"
            @emitLocation="handleEmmitedLocation"
          />

          <p
            v-if="checkIfLocation()"
            class="text-sm md:text-lg font-medium mt-4 absolute top-12 left-0"
          >
            Deliver to:
            <span class="text-sm md:text-lg font-bold">{{ checkLocationOutput() }}</span>
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
        v-if="mealData"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-8 mt-8"
      >
        <MealCard
          v-for="meal in mealData.hits"
          :key="meal.recipe.label"
          :category="meal.recipe.cuisineType[0]"
          :label="meal.recipe.label"
          :img="meal.recipe.image"
          @click="handleCardClick(meal)"
        />
      </div>
    </section>
    <section class="container mx-auto px-4 py-10">
      <font-awesome-icon
        :icon="['fas', 'fa-check']"
        class="text-7xl mx-auto w-full py-20 text-amber-400"
      />
      <div
        v-if="checkIfLocation()"
        class="flex flex-col w-full items-center justify-center gap-10 pb-20"
      >
        <h3 class="text-xl md:text-3xl font-bold">
          {{
            `Popular filters in ${
              emittedLocation.address.road !== ''
                ? emittedLocation.address.town
                : emittedOption.text
            }`
          }}
        </h3>
        <div class="md:w-1/2">
          <GenericList :items="dishTypes" field="dishType" />
        </div>
      </div>
    </section>
  </div>
  <div class="container mx-auto px-4">
    <h3 class="text-center text-4xl font-bold pb-20">Anything delivered</h3>
    <section class="flex flex-col items-center">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          :icon="'utensils'"
          :heading="'Your city\'s top restaurants'"
          :paragraph="'With a great variety of restaurants you can order your favourite food or '"
          :span="'explore new restaurants nearby!'"
        />
        <InfoCard
          :icon="'truck'"
          :heading="'Fast delivery'"
          :paragraph="'Like a flash! Order or send anything in your city and '"
          :span="'receive it in minutes.'"
        />
        <InfoCard
          :icon="'bowl-food'"
          :heading="'Groceries delivery & more'"
          :paragraph="'Find anything you need! From food to electronics and clothing'"
          :span="' if it\'s in your city order it and receive it.'"
        />
      </div>
      <div class="pt-20">
        <CtaBtn backCol="bg-green-500" textCol="text-gray-100"
          >Explore food around you</CtaBtn
        >
      </div>
    </section>
  </div>
  <section class="w-full">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#fbbf24"
        fill-opacity="1"
        d="M0,128L80,133.3C160,139,320,149,480,165.3C640,181,800,203,960,202.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
    <div class="bg-amber-400 w-full pb-20">
      <h3 class="text-center text-4xl font-bold pb-20">Countries where we deliver</h3>
      <div class="container mx-auto px-4">
        <GenericList v-if="countriesData" :items="countriesData" field="name.common" />
      </div>
    </div>
  </section>
</template>
