<script setup lang="ts">
const props = defineProps({
  cuisineType: Object,
});
</script>

<template>
  <li class="flex gap-x-2 items-center pb-2 border-solid border-b-1 border-gray-100">
    <font-awesome-icon
      :icon="['fas', cuisineType?.icon]"
      class="bg-orange-200 p-2 rounded-full text-gray-600 cursor-pointer"
    />
    <p>{{ cuisineType?.cuisineType }}</p>
  </li>
</template>
