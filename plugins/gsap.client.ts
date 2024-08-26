import { gsap, ScrollTrigger, Flip } from 'gsap/all'
import { defineNuxtPlugin, useNuxtApp } from 'nuxt/app'

export default defineNuxtPlugin({
  hooks: {
    'app:created'() {
      const nuxtApp = useNuxtApp()

      gsap.registerPlugin(ScrollTrigger, Flip)
    },
  },
})
