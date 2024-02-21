<script setup lang="ts">
const inputRef = useState<string>('inputRef', () => '');

const locationIconRef = ref<HTMLInputElement | null>(null);
const locationTextRef = ref<HTMLSpanElement | null>(null);

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
      @input="handleInputElements"
    />
    <span class="location-icon hidden md:block" ref="locationIconRef">
      <font-awesome-icon
        :icon="['fas', 'location-arrow']"
        class="absolute top-2 translate-x-1/2 left-50 bg-slate-200 p-2 rounded-2xl"
      />
    </span>
    <span
      class="location-text hidden text-sm text-green-600 font-bold md:block location-text absolute top-3.5 translate-x-1/2 right-20"
      ref="locationTextRef"
      >Use current location</span
    >
  </div>
</template>
