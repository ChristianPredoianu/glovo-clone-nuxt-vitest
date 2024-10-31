<script setup lang="ts">
const props = defineProps<{
  currentPage: number;

  totalItems: number;

  itemsPerPage: number;
}>();

const emit = defineEmits<{
  (event: 'page-changed', newPage: number): void;
}>();

// Calculate total pages
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const currentPage = ref(props.currentPage);

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;

  emit('page-changed', currentPage.value);
}
</script>

<template>
  <div class="flex items-center justify-center space-x-2 mt-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      Previous
    </button>

    <span v-for="page in totalPages" :key="page">
      <button
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 border rounded',
          {
            'bg-blue-600 text-white': page === currentPage,
            'bg-white text-blue-600 border-blue-600 hover:bg-blue-100':
              page !== currentPage,
          },
        ]"
      >
        {{ page }}
      </button>
    </span>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>
