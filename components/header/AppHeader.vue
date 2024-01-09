<script setup lang="ts">
const { isNavOpen, closeNav } = useNav();

useBackdrop(closeNav);
</script>

<template>
  <header class="relative bg-yellow-300">
    <nav class="flex items-center justify-between flex-wrap container mx-auto p-4">
      <span class="font-semibold text-green-500 text-xl">GlovoApp</span>
      <Backdrop />
      <Hamburger />
      <div
        id="test"
        :class="isNavOpen ? ['translate-x-[0rem]'] : ['-translate-x-[50rem]']"
        class="bg-white sm:bg-transparent absolute sm:relative z-50 top-0 left-0 w-10/12 sm:w-auto min-h-screen sm:min-h-full flex flex-grow flex-col items-center justify-center sm:justify-start sm:flex-row rounded-r-2xl sm:rounded-r-none transition ease-in-out py-4 sm:py-0 sm:translate-x-0 sm:ml-4"
      >
        <NavList />
      </div>
    </nav>
  </header>
</template>
