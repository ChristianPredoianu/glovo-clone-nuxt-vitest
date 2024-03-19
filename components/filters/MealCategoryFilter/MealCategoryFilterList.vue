<script setup lang="ts">
import { cuisineTypes } from '@/data/productCategoriesData';

const emits = defineEmits(['emitSelected']);

function emitSelected(selectedFilter: string) {
  emits('emitSelected', selectedFilter);
}
</script>

<template>
  <ul class="flex flex-col gap-y-2">
    <MealCategoryFilterListItem
      v-for="cuisineType in cuisineTypes"
      :key="cuisineType.id"
      :cuisineType="cuisineType"
      @emitSelected="emitSelected"
    />
  </ul>
</template>
