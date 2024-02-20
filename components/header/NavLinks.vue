<script setup lang="ts">
const { screenWidth } = useScreenWidth();
</script>
<template>
  <ul class="text-sm flex flex-col gap-4 sm:flex-row bg-red-500">
    <div class="flex items-center justify-between">
      <li class="block sm:inline-block text-teal-lighter hover:text-white mr-4">Home</li>
      <font-awesome-icon :icon="['fas', 'arrow-left']" v-if="screenWidth < 640" />
    </div>
    <div class="flex items-center justify-between">
      <li class="block sm:inline-block text-teal-lighter hover:text-white mr-4">
        Search
      </li>
      <font-awesome-icon :icon="['fas', 'arrow-left']" v-if="screenWidth < 640" />
    </div>
    <div class="flex items-center justify-between">
      <li class="block sm:inline-block text-teal-lighter hover:text-white mr-4">Cart</li>
      <font-awesome-icon :icon="['fas', 'arrow-left']" v-if="screenWidth < 640" />
    </div>
    <div class="flex items-center justify-between">
      <li class="block sm:inline-block text-teal-lighter hover:text-white mr-4">
        My Orders
      </li>
      <font-awesome-icon :icon="['fas', 'arrow-left']" v-if="screenWidth < 640" />
    </div>
    <div class="flex items-center justify-between">
      <li class="block sm:inline-block text-teal-lighter hover:text-white mr-4">
        My Account
      </li>
      <font-awesome-icon :icon="['fas', 'arrow-left']" v-if="screenWidth < 640" />
    </div>
  </ul>
</template>
