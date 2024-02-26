<script setup lang="ts">
import type { IDropdownOptions } from '@/interfaces/options.interface';

const props = defineProps<{
  options: IDropdownOptions[];
  idKey: keyof IDropdownOptions;
  textKey: keyof IDropdownOptions;
}>();

const isOpen = useState<boolean>('isOpen', () => true);
const selectedOption = useState<string>('selectedOption', () => 'Select an option');

const emits = defineEmits(['emit-option']);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

function selectOption(option: IDropdownOptions) {
  selectedOption.value = option.text;
  isOpen.value = false;
  emits('emit-option', option);
}
</script>

<template>
  <div class="relative">
    <div
      class="absolute top-full mt-1 w-full bg-white shadow-md rounded-md"
      v-if="isOpen"
    >
      <ul>
        <li
          v-for="option in props.options"
          :key="option[props.idKey]"
          class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          @click="selectOption(option)"
        >
          {{ option[props.textKey] }}
        </li>
      </ul>
    </div>
  </div>
</template>
