<script setup lang="ts">
const props = defineProps<{
  dishTypes: {
    id: number;
    dishType: string;
  }[];
}>();
</script>

<template>
  <ul class="flex flex-wrap gap-4 justify-around">
    <li
      class="bg-orange-200 text-lg font-semibold p-4 rounded-3xl cursor-pointer"
      v-for="dishType in dishTypes"
      :key="dishType.id"
    >
      {{ dishType.dishType.charAt(0).toUpperCase() + dishType.dishType.slice(1) }}
    </li>
  </ul>
</template>
