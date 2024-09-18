<script setup lang="ts">
import type { ModalProps, IMealModalProps } from '@/interfaces/interfaces.interface';

const props = defineProps<{ productModalProps: ModalProps | null; price: number }>();

const emits = defineEmits(['closeModal']);

const isMealModalProps = (props: ModalProps | null): props is IMealModalProps => {
  return props !== null && 'ingredients' in props;
};
</script>

<template>
  <main
    class="container relative mx-auto p-10 flex flex-col overflow-auto"
    v-if="productModalProps"
  >
    <p
      class="text-xl text-right mb-8 font-semibold cursor-pointer"
      @click="emits('closeModal')"
    >
      Close
    </p>

    <div class="mx-auto relative overflow-hidden w-full max-w-[500px] aspect-[16/9]">
      <img
        :src="props.productModalProps!.img"
        :alt="props.productModalProps!.label"
        class="rounded-lg object-cover w-full h-full"
      />
    </div>
    <h1 class="text-xl font-semibold text-gray-700 py-4">
      {{ props.productModalProps!.label.replace(/\brecipe\b|\brecipes\b/gi, '').trim() }}
    </h1>
    <h2 class="text-red-500 font-semibold text-2xl mb-8">{{ props.price }} $</h2>
    <div
      class="mt-2 mb-8 gap-2 text-gray-500"
      v-if="isMealModalProps(props.productModalProps)"
    >
      <ul
        v-for="ingredient in props.productModalProps!.ingredients"
        :key="ingredient.text"
      >
        <li>{{ ingredient.text }}</li>
      </ul>
    </div>
    <CtaBtn :textCol="'text-gray-200'">Add to cart {{ price }} $</CtaBtn>
  </main>
</template>
