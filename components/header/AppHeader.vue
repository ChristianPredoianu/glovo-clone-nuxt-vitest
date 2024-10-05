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
        <div class="w-3/5 md:w-1/2 flex items-center justify-end gap-6">
          <div class="flex items-center gap-1">
            <font-awesome-icon
              :icon="['fas', 'cart-shopping']"
              v-if="screenWidth > 640"
              class="cursor-pointer text-xl"
              @click="cartDialog?.showDialog()"
            />
            <CartCounter />
          </div>
          <CtaBtn :fontSize="'text-xs'" :textCol="'text-gray-100'" :paddingX="'px-6'"
            >Sign in</CtaBtn
          >
        </div>
      </div>
    </nav>
  </header>
</template>
