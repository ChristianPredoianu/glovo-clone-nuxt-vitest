<script setup lang="ts">
const props = defineProps({
  product: Object,
});
</script>

<template>
  <article class="">
    <img src="" alt="" />
    <div class="">
      Rating here
      <font-awesome-icon :icon="['fas', 'fa-like']" />
      <p>percent</p>
      <p>antal ratings</p>
    </div>
    <div class="">
      <h3>Product name</h3>
      <p>category</p>
    </div>
    <div class="">
      <font-awesome-icon :icon="['fas', 'fa-like']" />
      <p>gratuit</p>
      <p>time</p>
    </div>
  </article>
</template>

<!-- img, rating, antal rating, namn, category -->
