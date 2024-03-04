<script setup lang="ts">
const props = defineProps<{
  img: string;
  text: string;
}>();
</script>

<template>
  <article
    class="flex flex-col items-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
  >
    <img :src="props.img" :alt="props.text" class="w-20 h-20 rounded-full object-cover" />

    <h3 class="mt-3 text-center text-sm">{{ props.text }}</h3>
  </article>
</template>
