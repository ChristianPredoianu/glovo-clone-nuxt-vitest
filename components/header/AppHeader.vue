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
        class="list-div absolute z-50 top-0 rounded-r-2xl sm:rounded-r-none left-0 sm:relative w-10/12 min-h-screen sm:min-h-full flex-grow bg-white py-4 sm:py-0 sm:flex sm:items-center sm:translate-x-0 sm:ml-4 sm:w-auto transition ease-in-out"
      >
        <NavList />
      </div>
    </nav>
  </header>
</template>
