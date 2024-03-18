<script setup lang="ts">
import { cuisineTypes } from '@/data/productCategoriesData';
import type { ICuisineType } from '@/interfaces/meals.interface';

const emits = defineEmits(['emitSelected']);

const selectedCuisineType = useState<string>('selectedCuisineType', () => '');

const { closeModal } = useModal();
const { closeBackdrop } = useBackdrop();

function toggleActive(cuisineType: ICuisineType) {
  selectedCuisineType.value === cuisineType.cuisineType
    ? (selectedCuisineType.value = '')
    : (selectedCuisineType.value = cuisineType.cuisineType);
}

function isActive(cuisineType: ICuisineType): boolean {
  return selectedCuisineType.value === cuisineType.cuisineType;
}

function handleDelete() {
  selectedCuisineType.value = '';
}

function handleApply() {
  emits('emitSelected', selectedCuisineType.value);
  closeModal();
  closeBackdrop();
}
</script>

<template>
  <main class="container mx-auto py-10 px-4 flex flex-col overflow-auto">
    <h1 class="text-start text-2xl font-bold py-4 w-full">Types of dishes</h1>
    <ul
      class="grid place-content-center grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-1 gap-4 mt-8 w-full"
    >
      <li
        v-for="cuisineType in cuisineTypes"
        :key="cuisineType.id"
        class="py-4 rounded-lg flex flex-col items-center cursor-pointer gap-y-2"
        @click="toggleActive(cuisineType)"
      >
        <font-awesome-icon
          :icon="['fas', cuisineType.icon]"
          class="text-gray-700 text-3xl p-2 rounded-full w-min"
          :class="{ 'bg-orange-200': isActive(cuisineType) }"
        />
        <p class="text-gray-800 text-center text-sm font-semibold">
          {{ cuisineType.cuisineType }}
        </p>
      </li>
    </ul>
    <div class="mt-10 flex justify-center gap-x-3">
      <CtaBtn
        backCol="bg-transparent"
        textCol="text-green-600"
        borderCol="border-green-500"
        borderWidth="border"
        @click="handleDelete"
        >Delete</CtaBtn
      >
      <CtaBtn backCol="bg-green-600" textCol="text-gray-100" @click="handleApply"
        >Apply</CtaBtn
      >
    </div>
  </main>
</template>
