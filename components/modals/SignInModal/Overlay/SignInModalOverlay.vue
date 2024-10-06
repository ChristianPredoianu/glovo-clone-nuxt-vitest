<script setup lang="ts"></script>

<template>
  <section class="relative z-40 container mx-auto md:p-16">
    <h3 class="text-center text-3xl font-bold pb-10">Sign In</h3>
    <img src="@/sign-in.svg" alt="sign in" class="mx-auto mb-8 w-24 h-24" />
    <form class="flex flex-col gap-7 py-10 w-full">
      <!-- Email Field -->
      <div class="flex flex-col">
        <label for="email" class="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          class="w-full border-0 border-b-2 border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="email@example.com"
        />
      </div>

      <!-- Password Field -->
      <div class="flex flex-col">
        <label for="password" class="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          required
          class="border-0 border-b-2 border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="••••••••"
        />
      </div>

      <!-- Sign In Button -->
      <div class="w-full">
        <button
          type="submit"
          class="w-full bg-green-600 text-gray-100 py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50"
        >
          Sign In
        </button>
      </div>
    </form>
  </section>
</template>
