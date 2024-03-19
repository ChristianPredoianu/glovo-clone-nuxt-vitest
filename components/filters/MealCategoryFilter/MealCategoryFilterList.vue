<script setup lang="ts">
import { cuisineTypes } from '@/data/productCategoriesData';
</script>

<template>
  <ul class="flex flex-col gap-y-2">
    <MealCategoryFilterListItem
      v-for="cuisineType in cuisineTypes"
      :key="cuisineType.id"
      :cuisineType="cuisineType"
    />
  </ul>
</template>
