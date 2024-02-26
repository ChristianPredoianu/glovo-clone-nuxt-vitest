<script setup lang="ts">
import type { ILocationOptions } from '@/interfaces/options.interface';

const props = defineProps<{
  options: ILocationOptions[];
}>();

console.log(props.options);

const isOpen = useState<boolean>('isOpen', () => true);
const selectedOption = useState<string>('selectedOption', () => 'Select an option');

const emits = defineEmits(['emit-option']);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: ILocationOptions) => {
  selectedOption.value = option.text;
  isOpen.value = false;
};
</script>

<template>
  <div class="relative" @click="toggleDropdown">
    <div
      v-if="isOpen"
      class="absolute top-full mt-1 w-full bg-white shadow-md rounded-md"
    >
      <ul>
        <li
          v-for="option in props.options"
          :key="option.id"
          class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          @click="selectOption(option)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
