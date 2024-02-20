<script setup lang="ts">
import { navLinks } from '@/data/navLinks';

const { screenWidth } = useScreenWidth();
</script>
<template>
  <ul class="text-sm flex flex-col gap-4 sm:flex-row">
    <div
      class="flex items-center justify-between"
      v-for="navLink in navLinks"
      key="title"
    >
      <li
        class="block sm:inline-block text-teal-lighter hover:text-white cursor-pointer sm:mr-4"
      >
        {{ navLink.title }}
      </li>
      <font-awesome-icon :icon="navLink.icon" v-if="screenWidth < 640" />
    </div>
  </ul>
</template>
