<script setup lang="ts">
import Modal from '@/components/modals/Modal/Modal.vue';

const { isNavOpen, closeNav } = useNav();
const { closeBackdrop } = useBackdrop();
const { screenWidth } = useScreenWidth();

const cartDialog = ref<InstanceType<typeof Modal> | null>(null);

function closeNavigationDialog() {
  closeNav();
  closeBackdrop();
}

onMounted(() => {
  window.addEventListener('resize', closeNavigationDialog);
});

onUnmounted(() => {
  window.removeEventListener('resize', closeNavigationDialog);
});
</script>

<template>
  <header class="relative bg-amber-400" v-if="screenWidth">
    <nav class="flex items-center justify-between flex-wrap container mx-auto p-4">
      <Modal ref="cartDialog"
        ><CartModalOverlay @closeModal="cartDialog?.closeDialog()"
      /></Modal>
      <Logo />
      <Backdrop @closeElement="closeNav" />
      <Hamburger />
      <div
        id="nav-list-div"
        :class="isNavOpen ? ['translate-x-[0rem]'] : ['-translate-x-[50rem]']"
        class="h-full bg-white sm:bg-transparent fixed sm:relative z-40 top-0 left-0 w-10/12 sm:w-auto min-h-screen sm:min-h-full flex flex-grow flex-col items-center justify-center sm:justify-start sm:flex-row rounded-r-2xl sm:rounded-r-none transition ease-in-out sm:py-0 sm:translate-x-0 sm:ml-4"
      >
        <NavItems />
        <font-awesome-icon
          :icon="['fas', 'cart-shopping']"
          class="cursor-pointer"
          v-if="screenWidth > 640"
          @click="cartDialog?.showDialog()"
        />
      </div>
    </nav>
  </header>
</template>
