/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */

module.exports = {
  ssr: false,
  head: {
    title: "melee-ach",
    meta: [{ charset: "utf-8" }],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  loading: false,
  plugins: [{ ssr: true, src: "@/plugins/icons.js" }],
  components: true,
  buildModules: [],
  modules: ["@nuxtjs/vuetify"],
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: "#1867c0",
          secondary: "#b0bec5",
          accent: "#8c9eff",
          error: "#b71c1c",
        },
      },
    },
  },
  // build: {
  //   extend(config, { isDev, isClient }) {
  //     config.module.rules.push({
  //       test: /\.html$/i,
  //       loader: "html-loader",
  //     });
  //   },
  // },
};
