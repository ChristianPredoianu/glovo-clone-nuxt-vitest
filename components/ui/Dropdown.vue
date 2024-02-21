<script setup lang="ts">
import type { ILocationsData } from '@/interfaces/locations.interface';

const props = defineProps<{
  locationsData: ILocationsData[];
}>();

const isOpen = useState<boolean>('isOpen', () => true);

const selectedOption = ref('Select an option');
const options = ref(['Option 1', 'Option 2', 'Option 3']);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
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
          v-for="option in props.locationsData"
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
