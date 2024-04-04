<script setup lang="ts">
import type { IFakeStoreCategories } from '@/interfaces/products.interface';
import type { ICuisineType } from '@/interfaces/meals.interface';

const emits = defineEmits(['emitSelected']);

const { closeModal } = useModal();
const { closeBackdrop } = useBackdrop();
const { selected } = useIsActive();
const { isFakeStoreIndex } = useFilter();

function handleDelete() {
  selected.value = '';
}

//use emit to close modal
function handleApply() {
  closeModal();
  closeBackdrop();
}

function emitSelected(selectedFilter: IFakeStoreCategories | ICuisineType) {
  emits('emitSelected', selectedFilter);
}
</script>

<template>
  <main class="container mx-auto py-10 px-4 flex flex-col overflow-auto">
    <h1 class="text-start text-2xl font-bold py-4 w-full">
      Types of {{ isFakeStoreIndex ? 'products' : 'dishes' }}
    </h1>
    <FilterModalList @selectedFilter="emitSelected" />
    <div class="mt-10 flex justify-center gap-x-3">
      <CtaBtn
        data-test="delete-btn"
        backCol="bg-transparent"
        textCol="text-green-600"
        borderCol="border-green-500"
        borderWidth="border"
        @click="handleDelete"
        >Delete</CtaBtn
      >
      <CtaBtn
        data-test="apply-btn"
        backCol="bg-green-600"
        textCol="text-gray-100"
        @click="handleApply"
        >Apply</CtaBtn
      >
    </div>
  </main>
</template>
