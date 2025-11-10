import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,

  modules: ["@vee-validate/nuxt"],

  css: ["ant-design-vue/dist/reset.css"],

  build: {
    transpile: ["ant-design-vue", "@ant-design-vue/charts"],
  },

  vite: {
    resolve: {
      alias: {
        dayjs: "dayjs/esm",
      },
    },
  },

  devtools: { enabled: true },
});
