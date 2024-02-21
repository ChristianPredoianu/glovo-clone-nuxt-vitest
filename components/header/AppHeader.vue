<script setup lang="ts">
const { isNavOpen, closeNav } = useNav();
const { closeBackdrop } = useBackdrop(closeNav);
const { screenWidth, setInitialWidth } = useScreenWidth();

function closeNavOnResize() {
  closeNav();
  closeBackdrop();
}

onMounted(() => {
  console.log(screenWidth.value);
});

onMounted(() => {
  window.addEventListener('resize', closeNavOnResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', closeNavOnResize);
});
</script>

<template>
  <header class="relative bg-yellow-300" v-if="screenWidth">
    <nav class="flex items-center justify-between flex-wrap container mx-auto p-4">
      <Logo />
      <Backdrop />
      <Hamburger />
      <div
        id="nav-list-div"
        :class="isNavOpen ? ['translate-x-[0rem]'] : ['-translate-x-[50rem]']"
        class="h-full bg-white sm:bg-transparent absolute sm:relative z-50 top-0 left-0 w-10/12 sm:w-auto min-h-screen sm:min-h-full flex flex-grow flex-col items-center justify-center sm:justify-start sm:flex-row rounded-r-2xl sm:rounded-r-none transition ease-in-out sm:py-0 sm:translate-x-0 sm:ml-4"
      >
        <NavItems />
      </div>
    </nav>
  </header>
</template>
