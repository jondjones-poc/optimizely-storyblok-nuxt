export default {
  target: 'static',
  ssr: false,
  generate: {
    fallback: true
  },
  head: {
    title: 'optimizely-nuxt-example',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],
  plugins: [
    '~/plugins/components',
    '~/plugins/composition-api.js',
    '~/plugins/storyblok-rich-text-renderer.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.SB_TOKEN,
        cacheProvider: 'memory'
      }
    ],
  ],
  build: {
  },
  publicRuntimeConfig: {
    optimizelySdkKey: process.env.OPTIMIZELY_SDK
  }
}
