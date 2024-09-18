<script setup lang="ts">
const props = defineProps<{
  category: string;
  label: string;
  img?: string;
}>();
</script>

<template>
  <article class="flex flex-col relative py-4 cursor-pointer rounded-md">
    <div class="relative">
      <div class="relative overflow-hidden w-full max-w-[500px] aspect-[16/9]">
        <img
          :src="props.img"
          :alt="props.label"
          class="rounded-lg transform transition-transform duration-300 hover:scale-105 object-cover w-full h-full"
        />
      </div>
      <p
        class="absolute bottom-2 left-2 px-2 py-1 text-sm font-semibold tracking-wide text-gray-100 bg-opacity-50 rounded-md"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
      >
        {{ props.category.charAt(0).toUpperCase() + props.category.slice(1) }}
      </p>
    </div>
    <div class="flex flex-col h-full">
      <!-- Replace word Recipe or recipes-->
      <h3 class="font-bold text-sm mt-1 flex-1">
        {{ label.replace(/\brecipes?\b/gi, '') }}
      </h3>

      <div class="flex flex-wrap">
        <div class="flex items-center gap-2 mt-2 py-1 px-4 bg-amber-400 p-1 rounded-md">
          <font-awesome-icon :icon="['fas', 'fa-truck']" />
          <p>Free</p>
        </div>
      </div>
    </div>
  </article>
</template>
