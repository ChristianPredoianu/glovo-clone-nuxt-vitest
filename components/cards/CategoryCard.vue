<script setup lang="ts">
const props = defineProps<{
  index: number;
  category: string;
  img: string;
  text: string;
}>();

async function navigateToPage(selectedCategory: object) {
  await navigateTo({
    path: selectedCategory.category,
    query: { index: selectedCategory.index },
  });
}
</script>

<template>
  <article
    class="flex flex-col items-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
    @click="navigateToPage(props)"
  >
    <img
      :src="props.img"
      :alt="props.text"
      class="w-20 h-20 rounded-full object-cover hover:scale-105"
    />

    <h3 class="mt-3 text-center">{{ props.text }}</h3>
  </article>
</template>
