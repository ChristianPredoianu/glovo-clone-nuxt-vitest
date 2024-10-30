import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  plugins: ['~/plugins/firebase.client.ts'],

  imports: {
    dirs: ['composables', 'composables/auth', 'composables/ui'],
  },
  runtimeConfig: {
    apiSecretLocationReverse: process.env.NUXT_API_KEY_LOCATION_REVERSE,
    public: {
      apiAutoconfig: process.env.NUXT_PUBLIC_API_AUTOCOMPLETE,
      apiReverse: process.env.NUXT_PUBLIC_API_REVERSE,
      apiEdamam: process.env.NUXT_PUBLIC_API_EDAMAM,
      apiEdamamAppId: process.env.NUXT_PUBLIC_EDAMAM_APP_ID,
      apiRestCountries: process.env.NUXT_PUBLIC_API_COUNTRIES,
      fakeStoreBase: process.env.NUXT_FAKESTORE_BASE,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-vitest'],

  googleFonts: {
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
