// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  // devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/helper/_colors.scss";',
        },
      },
    },
  },

  css: ['~/assets/scss/main.scss'],

  devtools: {
    enabled: false,
  },
})
