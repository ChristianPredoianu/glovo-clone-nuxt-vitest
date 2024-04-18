<script setup lang="ts">
const { screenWidth } = useScreenWidth();
import type {
  IFakeStoreCategories,
  ICuisineType,
} from '@/interfaces/interfaces.interface';

const emits = defineEmits(['emitSelected', 'closeModal']);

const userSelectedFilter = ref<IFakeStoreCategories | ICuisineType | string>('');

const { selected } = useIsActive();
const { isFakeStoreIndex } = useFilter();

function handleDelete() {
  selected.value = '';
  userSelectedFilter.value = '';

  /*   emits('emitSelected', userSelectedFilter.value); */
  console.log(userSelectedFilter.value);
}

function handleApply() {
  emits('closeModal');
  console.log(userSelectedFilter.value);
  emits('emitSelected', userSelectedFilter.value);
}

function setSelectedFilter(selectedFilter: IFakeStoreCategories | ICuisineType) {
  userSelectedFilter.value = selectedFilter;
}

watch(
  () => screenWidth.value,
  () => {
    if (screenWidth.value >= 1024) emits('closeModal');
  }
);
</script>

<template>
  <main
    class="container mx-auto relative py-10 px-4 flex flex-col w-full h-full overflow-y-auto"
  >
    <p class="text-xl font-semibold absolute top-4 right-4" @click="emits('closeModal')">
      Close
    </p>
    <h1 class="text-start text-2xl font-bold py-4 w-full">
      Types of {{ isFakeStoreIndex ? 'products' : 'dishes' }}
    </h1>
    <FilterModalList @selectedFilter="setSelectedFilter" />
    <div
      class="mt-10 flex flex-col gap-y-4 sm:flex-row sm:gap-y-0 justify-center gap-x-3"
    >
      <CtaBtn
        class="order-2 sm:order-1"
        data-test="delete-btn"
        backCol="bg-transparent"
        textCol="text-green-600"
        borderCol="border-green-500"
        borderWidth="border"
        @click="handleDelete"
        >Delete</CtaBtn
      >
      <CtaBtn
        class="order-1 sm:order-2"
        data-test="apply-btn"
        backCol="bg-green-600"
        textCol="text-gray-100"
        @click="handleApply"
        >Apply</CtaBtn
      >
    </div>
  </main>
</template>
