<script setup lang="ts">
const { toggleActive, isActive } = useIsActive();
const { filters, getCategoryName } = useFilter();
</script>

<template>
  <li
    v-for="category in filters"
    :key="category.id"
    class="py-4 rounded-lg flex flex-col items-center cursor-pointer gap-y-2"
    @click="toggleActive(getCategoryName(category))"
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
  </li>
</template>
