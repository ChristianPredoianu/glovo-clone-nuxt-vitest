<script setup lang="ts">
import SignInForm from '@/components/forms/SignInForm/SignInForm.vue';
import SignUpForm from '@/components/forms/SignUpForm/SignUpForm.vue';

const currentComponent = ref(markRaw(SignInForm));

function changeToSignUpComp() {
  currentComponent.value = markRaw(SignUpForm);
}
</script>

<template>
  <section class="relative z-40 container mx-auto md:p-16">
    <h3 class="text-center text-3xl font-bold pb-10">
      {{ currentComponent === SignInForm ? 'Sign In' : 'Sign Up' }}
    </h3>
    <img src="@/sign-in.svg" alt="sign in" class="mx-auto mb-8 w-24 h-24" />
    <component :is="currentComponent" />
    <h4 class>
      Dont't have an account yet?
      <span
        class="text-yellow-600 font-semibold cursor-pointer"
        @click="changeToSignUpComp"
        >Sign up</span
      >
    </h4>
  </section>
</template>
