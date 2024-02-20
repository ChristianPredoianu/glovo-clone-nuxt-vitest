<script setup lang="ts">
const { screenWidth } = useScreenWidth();
const { closeNav } = useNav();
const { closeBackdrop } = useBackdrop(closeNav);
</script>

<template>
  <div class="flex flex-col h-full gap-8">
    <font-awesome-icon
      class="absolute top-6 right-6"
      :icon="['fas', 'arrow-left']"
      size="xl"
      v-if="screenWidth < 640"
      @click="closeBackdrop"
    />
    <div class="border-b-2 w-full flex justify-center mt-40" v-if="screenWidth < 640">
      <h1 class="text-2xl pb-2">
        <span class="text-green-500">Connect</span> | New Account
      </h1>
    </div>
    <NavLinks />
  </div>
</template>
