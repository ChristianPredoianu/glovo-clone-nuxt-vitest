<script setup lang="ts">
import type { IFakeStoreCategories } from '@/interfaces/products.interface';
import type { ICuisineType } from '@/interfaces/meals.interface';

const { toggleActive, isActive } = useIsActive();
const { filters, getCategoryName } = useFilter();

const emits = defineEmits(['selectedFilter']);

function handleClick(category: IFakeStoreCategories | ICuisineType) {
  emits('selectedFilter', category);
  toggleActive(getCategoryName(category));
}
</script>

<template>
  <ul
    class="grid place-content-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-4 mt-8 w-full"
  >
    <li
      v-for="category in filters"
      :key="category.id"
      class="relative py-4 rounded-lg flex flex-col items-center cursor-pointer gap-y-2"
      @click="handleClick(category)"
    >
      <font-awesome-icon
        :icon="['fas', category.icon]"
        data-test="filter-icon"
        class="text-gray-700 text-3xl p-2 rounded-full w-min"
        :class="{ 'bg-orange-200': isActive(getCategoryName(category)) }"
      />
      <p class="text-gray-800 text-center text-sm font-semibold">
        {{ getCategoryName(category) }}
      </p>
      <p
        v-if="isActive(getCategoryName(category))"
        class="absolute bottom-8 right-12 rounded-full px-1.5 pb-1 text-xs bg-gray-600 text-gray-200 cursor-pointer"
      >
        x
      </p>
    </li>
  </ul>
</template>
