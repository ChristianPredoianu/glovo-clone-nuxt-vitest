<script setup lang="ts">
import { cuisineTypes } from '@/data/productCategoriesData';
</script>

<template>
  <ul>
    <li v-for="cuisineType in cuisineTypes" :key="cuisineType.id">
      <div>
        <font-awesome-icon :icon="['fas', cuisineType.icon]" />
        <p>{{ cuisineType.cuisineType }}</p>
      </div>
    </li>
  </ul>
</template>
