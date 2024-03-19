<script setup lang="ts">
const props = defineProps({
  cuisineType: Object,
});

const emits = defineEmits(['emitSelected']);

const { selected, toggleActive, isActive } = useIsActive();

function handleClick(selectedFilter: string) {
  emits('emitSelected', selectedFilter);
  toggleActive(selectedFilter);
}
</script>

<template>
  <li
    class="flex gap-x-2 items-center pb-2 border-solid border-b-1 border-gray-100 cursor-pointer"
    @click="handleClick(cuisineType?.cuisineType)"
  >
    <font-awesome-icon
      :icon="['fas', cuisineType?.icon]"
      class="bg-orange-200 p-2 rounded-full text-gray-600"
      :class="{ 'bg-orange-300': isActive(cuisineType?.cuisineType) }"
    />
    <p :class="{ 'font-semibold': isActive(cuisineType?.cuisineType) }">
      {{ cuisineType?.cuisineType }}
    </p>
  </li>
</template>
