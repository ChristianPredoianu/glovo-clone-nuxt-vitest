<script setup lang="ts">
interface ISelectedCategory {
  index: number;
  img: string;
  text: string;
  category: string;
}

const props = defineProps<ISelectedCategory>();

async function navigateToPage(selectedCategory: ISelectedCategory) {
  await navigateTo({
    path: selectedCategory.category,
    query: { index: selectedCategory.index },
  });
}
</script>

<template>
  <article
    class="flex flex-col items-center transform cursor-pointer"
    @click="navigateToPage(props)"
  >
    <img
      :src="props.img"
      :alt="props.text"
      class="w-20 h-20 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105"
    />
    <h3 class="mt-3 text-center font-semibold">{{ props.text }}</h3>
  </article>
</template>
