<script setup lang="ts">
import type { IDropdownOptions } from '@/interfaces/options.interface';
import { useKeyDown } from '@/composables/useKeyDown';

const props = defineProps<{
  options: IDropdownOptions[];
  idKey: keyof IDropdownOptions;
  textKey: keyof IDropdownOptions;
}>();

const isOpen = useState<boolean>('isOpen', () => true);

const { selectedIndex } = useKeyDown(props.options.length, selectOption);

const emits = defineEmits(['emit-option']);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

function selectOption(index: number) {
  const option = props.options[index];
  isOpen.value = false;
  emits('emit-option', option);
}

//The API sometimes returns two of the same adresses, this creates unique returns
//so that we don't get duplicate keys when looping through props.options
const uniqueOptions = computed(() => {
  const uniqueOptionsMap = new Map(
    props.options.map((option) => [option[props.idKey], option])
  );
  return Array.from(uniqueOptionsMap.values());
});

onUpdated(() => {
  isOpen.value = true;
});
</script>

<template>
  <div class="relative" @click="toggleDropdown">
    <div
      class="absolute top-full mt-1 w-full bg-white shadow-md rounded-md"
      v-if="isOpen"
    >
      <ul>
        <li
          v-for="(option, index) in uniqueOptions"
          :key="option[props.idKey]"
          class="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          :class="{ 'bg-gray-200': index === selectedIndex }"
          @click="selectOption(index)"
        >
          {{ option[props.textKey] }}
        </li>
      </ul>
    </div>
  </div>
</template>
