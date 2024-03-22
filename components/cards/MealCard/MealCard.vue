<script setup lang="ts">
import { generateRandomPrice } from '@/helpers/randomPrice';

const props = defineProps<{
  category: string;
  label: string;
  img?: string;
}>();

const price = ref<string | null>(null);

onMounted(() => {
  // Generate the price only on the client side
  price.value = generateRandomPrice();
});
</script>

<template>
  <article
    class="flex flex-col relative p-4 border-b-2 cursor-pointer shadow-sm rounded-md"
  >
    <div class="relative">
      <img
        :src="props.img"
        :alt="props.label"
        class="rounded-lg transform transition-transform duration-300 hover:scale-105"
      />
      <p
        class="absolute bottom-2 left-2 bg-gray-600 p-1 text-xs text-gray-100 rounded-md"
      >
        {{ props.category.charAt(0).toUpperCase() + props.category.slice(1) }}
      </p>
    </div>
    <div class="flex flex-col h-full">
      <!-- Replace word Recipe or recipes-->
      <h3 class="font-bold text-sm mt-1 flex-1">
        {{ label.replace(/\brecipes?\b/gi, '') }}
      </h3>

      <div class="flex flex-wrap items-center justify-between mt-2 py-1">
        <p class="text-green-500">{{ price }}$</p>
        <div class="flex items-center gap-2 bg-amber-400 p-1 rounded-md">
          <font-awesome-icon :icon="['fas', 'fa-truck']" />
          <p>Free</p>
        </div>
      </div>
    </div>
  </article>
</template>
