<script setup lang="ts">
const props = defineProps({
  backCol: String,
  textCol: {
    type: String,
    default: undefined,
  },
  borderCol: {
    type: String,
    default: undefined,
  },
  borderWidth: {
    type: String,
    default: undefined,
  },
});
const emits = defineEmits(['clicked']);
</script>

<template>
  <button
    class="bg-green-600 py-3 px-10 rounded-xl font-bold cursor-pointer hover:bg-green-700"
    :class="[props.backCol, props.textCol, props.borderCol, props.borderWidth]"
    @click="emits('clicked')"
  >
    <slot></slot>
  </button>
</template>
