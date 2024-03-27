<script setup lang="ts">
const emits = defineEmits(['emitSelected']);

const { closeModal } = useModal();
const { closeBackdrop } = useBackdrop();
const { selected, toggleActive, isActive } = useIsActive();
const { isFakeStoreIndex, filters, getCategoryName } = useFilter();

function handleDelete() {
  selected.value = '';
}

function handleApply() {
  emits('emitSelected', selected.value);
  closeModal();
  closeBackdrop();
}
</script>

<template>
  <main class="container mx-auto py-10 px-4 flex flex-col overflow-auto">
    <h1 class="text-start text-2xl font-bold py-4 w-full">
      Types of {{ isFakeStoreIndex ? 'products' : 'dishes' }}
    </h1>
    <FilterModalList />
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
