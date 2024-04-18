<script setup lang="ts">
const props = defineProps<{
  text: string;
  icon: string;
  backCol: string;
}>();

const emits = defineEmits(['emitClick']);

function handleClick() {
  emits('emitClick');
}
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <font-awesome-icon
      :icon="['fas', props.icon]"
      class="bg-orange-200 p-2 rounded-full text-gray-600 cursor-pointer"
      :class="[props.backCol]"
      @click="handleClick"
    />
    <p class="text-xs text-center">{{ props.text }}</p>
  </div>
</template>
