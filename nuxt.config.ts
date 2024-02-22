// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_KEY: process.env.NUXT_API_KEY,
      API_LOCATIONS_BASEURL: process.env.NUXT_API_LOCATIONS_BASEURL,
    },
  },

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-vitest'],
  googleFonts: {
    // Options
    families: {
      Raleway: {
        // weights
        wght: [100, 400],
        // italic
        ital: [100],
      },
    },
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  components: [
    { path: '@/components/header', extensions: ['vue'] },
    { path: '@/components/header/links', extensions: ['vue'] },
    { path: '@/components/ui', extensions: ['vue'] },
    { path: '@/components/forms', extensions: ['vue'] },
  ],
});
