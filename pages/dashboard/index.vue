<script setup lang="ts">
import SelectDropdown from '@/components/ui/Dropdown/SelectDropdown.vue';
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
  { id: 9, name: 'Item 9' },
  { id: 10, name: 'Item 10' },
  { id: 11, name: 'Item 11' },
  { id: 12, name: 'Item 12' },
  { id: 13, name: 'Item 13' },
  { id: 14, name: 'Item 14' },
  { id: 15, name: 'Item 15' },
]);

const { currentPage, itemsPerPage, totalItems, displayedItems, handlePageChange } =
  usePagination(items, 5);

/* const currentPage = ref(1);
const itemsPerPage = 5;
const totalItems = items.value.length; */

// Computed property to get displayed items for the current page
/* const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.value.slice(start, end);
}); */

/* function handlePageChange(newPage: number) {
  currentPage.value = newPage;
} */
</script>

<template>
  <div class="container mx-auto px-4 py-4">
    <section
      class="flex flex-col gap-y-4 items-center md:gap-y-6 lg:flex-row lg:justify-between bg-white p-4 rounded-xl"
    >
      <SearchBar />
      <Profile />
    </section>
    <section class="p-4 mt-4">
      <h1 class="font-semibold text-lg">Your favorites</h1>
      <div class="flex flex-col items-center mt-4">
        <SelectDropdown defaultOptionText="All Categories" />
        <Pagination
          :current-page="currentPage"
          :total-items="totalItems"
          :items-per-page="itemsPerPage"
          @page-changed="handlePageChange"
        />
      </div>
    </section>
  </div>
</template>
