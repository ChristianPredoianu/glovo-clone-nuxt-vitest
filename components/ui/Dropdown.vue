<script setup lang="ts">
interface IOptions {
  place_id: number;
  display_name: string;
}

const props = defineProps<{
  options: { place_id: number; display_name: string }[];
}>();

console.log(props.options);

const isOpen = useState<boolean>('isOpen', () => true);
const selectedOption = useState<string>('selectedOption', () => 'Select an option');

const emits = defineEmits(['emit-option']);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: IOptions) => {
  selectedOption.value = option.display_name;
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
          :key="option.place_id"
          class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          @click="selectOption(option)"
        >
          {{ option.display_name }}
        </li>
      </ul>
    </div>
  </div>
</template>
