<script setup lang="ts">
const props = defineProps<{
  items: Record<string, any>[];
  field: string;
}>();

console.log(props.field);
</script>

<template>
  <li
    class="bg-orange-200 text-lg font-semibold p-4 rounded-3xl cursor-pointer"
    v-for="(item, key) in items"
    :key="key"
  >
    <!-- {{ item[props.field].charAt(0).toUpperCase() + item[props.field].slice(1) }} -->
    {{ item.name.common }}

    {{ item[props.field] }}
  </li>
</template>
