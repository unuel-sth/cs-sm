// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@hebilicious/authjs-nuxt"],

  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET,
    },
    steam: {
      issuer: process.env.NUXT_AUTH_STEAM_ISSUER,
      clientId: process.env.NUXT_AUTH_STEAM_CLIENT_ID,
      clientSecret: process.env.NUXT_AUTH_STEAM_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_BASE_URL,
        verifyClientOnEveryRequest: false,
      },
    },
  },
});
