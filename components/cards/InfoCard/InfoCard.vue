<script setup lang="ts">
const props = defineProps<{
  icon: string;
  heading: string;
  paragraph: string;
  span: string;
}>();
</script>

<template>
  <div class="flex justify-around">
    <article
      class="flex flex-col items-center gap-4 py-8 px-12 h-full w-1/2 md:w-full text-center"
    >
      <font-awesome-icon :icon="['fas', props.icon]" class="text-7xl text-orange-400" />
      <h3 class="flex-grow text-xl font-bold">{{ props.heading }}</h3>
      <p class="flex-grow lg:px-10">
        {{ props.paragraph
        }}<span class="bg-orange-400 font-medium rounded-md">{{ props.span }}</span>
      </p>
    </article>
  </div>
</template>
