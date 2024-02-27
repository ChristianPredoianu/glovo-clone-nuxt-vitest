<script setup lang="ts">
import type { IDropdownOptions } from '@/interfaces/options.interface';

const inputRef = useState<string>('inputRef', () => '');

const props = defineProps<{
  options: IDropdownOptions[];
  idKey: keyof IDropdownOptions;
  textKey: keyof IDropdownOptions;
}>();

const locationIconRef = ref<HTMLInputElement | null>(null);
const locationTextRef = ref<HTMLSpanElement | null>(null);

const emits = defineEmits(['inputRefEmit', 'emit-option']);

const { latitude, getLocation } = useGeolocation();

console.log(latitude);

function handleInputElements() {
  if (inputRef) {
    inputRef.valueOf.length > 20;
    if (inputRef.value.length > 20) {
      locationIconRef.value?.classList.add('md:hidden');
      locationTextRef.value?.classList.add('md:hidden');
    } else {
      locationIconRef.value?.classList.remove('md:hidden');
      locationTextRef.value?.classList.remove('md:hidden');
    }
  }
}

function handleEmmitedOption(option: number) {
  emits('emit-option', option);
}

function handleOnChange() {
  handleInputElements();
  emits('inputRefEmit', inputRef.value);
}
</script>

<template>
  <div>
    <span class="h-full bg-green-500 absolute rounded-l-md top-0 px-3 flex items-center">
      <font-awesome-icon :icon="['fas', 'location']" />
    </span>
    <input
      type="text"
      placeholder="What's your address?"
      class="py-3 px-12 w-full rounded-md"
      v-model="inputRef"
      @input="handleOnChange"
    />
    <span class="location-icon hidden md:block" ref="locationIconRef">
      <font-awesome-icon
        :icon="['fas', 'location-arrow']"
        class="absolute top-2 translate-x-1/2 left-50 bg-slate-200 p-2 rounded-2xl cursor-pointer"
        @click="getLocation"
      />
    </span>
    <span
      class="location-text hidden text-sm text-green-600 font-bold md:block location-text absolute top-3.5 translate-x-1/2 right-20 cursor-pointer"
      ref="locationTextRef"
      @click="getLocation"
      >Use current location</span
    >
  </div>
  <Dropdown
    v-if="props.options"
    :options="props.options"
    textKey="text"
    idKey="id"
    @emit-option="handleEmmitedOption"
  />
</template>
