<script setup lang="ts">
const { screenWidth } = useScreenWidth();

const props = defineProps<{
  title: string;
  link: string;
  icon: string[];
}>();
</script>

<template>
  <li
    v-if="!(screenWidth > 640 && props.title === 'Cart')"
    class="block text-2xl font-semibold text-gray-600 sm:text-sky-900 sm:text-sm sm:inline-block text-teal-lighter sm:hover:text-white cursor-pointer sm:mr-4"
    :class="{
      'text-xs': screenWidth < 230,
    }"
  >
    <div
      class="w-full flex items-center justify-between border-b-2 sm:border-0 py-2 cursor-pointer"
    >
      {{ props.title }}
      <font-awesome-icon :icon="props.icon" v-if="screenWidth < 640" />
    </div>
  </li>
</template>
