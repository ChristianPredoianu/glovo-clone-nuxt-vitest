// https://nuxt.com/docs/api/configuration/nuxt-config
console.log(process.env);
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecretLocationReverse: process.env.NUXT_API_KEY_LOCATION_REVERSE,
    public: {
      apiAutoconfig: process.env.NUXT_PUBLIC_API_AUTOCOMPLETE,
      apiReverse: process.env.NUXT_PUBLIC_API_REVERSE,
      apiEdamam: process.env.NUXT_PUBLIC_API_EDAMAM,
      apiRestCountries: process.env.NUXT_PUBLIC_API_COUNTRIES,
      fakeStoreBase: process.env.NUXT_FAKESTORE_BASE,
    },
  },
  plugins: ['~/plugins/firebase.ts'],

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-vitest'],
  googleFonts: {
    // Options
    families: {
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css', '@/assets/transitions.css'],
  components: [
    { path: '@/components/header', extensions: ['vue'] },
    { path: '@/components/header/links', extensions: ['vue'] },
    { path: '@/components/ui', extensions: ['vue'] },
    { path: '@/components/forms', extensions: ['vue'] },
    { path: '@/components/cards', extensions: ['vue'] },
    { path: '@/components/buttons', extensions: ['vue'] },
    { path: '@/components/filters', extensions: ['vue'] },
    { path: '@/components/modals', extensions: ['vue'] },
    { path: '@/components/counters', extensions: ['vue'] },
    { path: '@/components/cart', extensions: ['vue'] },
  ],
});
