<script setup lang="ts">
import type { ILocationsData } from '@/interfaces/locations.interface';

const emittedInputRef = useState<string>('emmitedInputRef', () => '');

const runtimeConfig = useRuntimeConfig();

const { data } = await useFetch<ILocationsData[]>(
  () =>
    `${runtimeConfig.public.apiBase}pk.a75cdfe1cc307b34218d8021f4122dc6&q=${emittedInputRef.value}&limit=5`
);

function handleEmittedSearchQuery(searchQuery: string) {
  emittedInputRef.value = searchQuery;
  console.log(data.value);
}
</script>

<template>
  <section class="bg-yellow-400 text-gray-800">
    <div
      class="container px-4 pt-28 mx-auto flex flex-col items-center justify-center gap-8 p-10 md:flex-row"
    >
      <div class="w-1/2 md:w-1/3">
        <img src="@/assets/food.png" alt="food" class="md:w-1/2" />
      </div>
      <div class="bg-yellow-400 text-center">
        <h1 class="text-2xl font-bold md:text-4xl">Food delivery and more</h1>
        <p class="mt-2 font-medium md:font-xl">Groceries, shops, pharmacies, anything!</p>
        <div class="input-container relative mt-8">
          <AdressForm @inputRefEmit="handleEmittedSearchQuery" />
        </div>
        <Dropdown v-if="emittedInputRef !== '' && data" :options="data" />
      </div>
    </div>
  </section>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      fill="#facc15"
      fill-opacity="1"
      d="M0,32L60,48C120,64,240,96,360,106.7C480,117,600,107,720,122.7C840,139,960,181,1080,170.7C1200,160,1320,96,1380,64L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
    ></path>
  </svg>
</template>
