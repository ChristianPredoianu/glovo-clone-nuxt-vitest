// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

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
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  components: [
    { path: '@/components/header', extensions: ['vue'] },
    { path: '@/components/header/links', extensions: ['vue'] },
    { path: '@/components/ui', extensions: ['vue'] },
    { path: '@/components/forms', extensions: ['vue'] },
  ],
});
