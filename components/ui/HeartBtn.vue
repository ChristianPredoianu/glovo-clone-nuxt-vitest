<script setup lang="ts">
const isFavorite = ref<boolean>(false);

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}
</script>

<template>
  <button
    @click.stop="toggleFavorite"
    class="cursor-pointer"
    :class="[
      isFavorite ? 'text-red-500 border-red-500' : 'text-gray-500 border-gray-300',
    ]"
  >
    <font-awesome-icon :icon="['fas', 'fa-heart']" />
  </button>
</template>
