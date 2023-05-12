import { resolve } from "node:path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Inspect from "vite-plugin-inspect";
import Inspector from "vite-plugin-vue-inspector";

// vite.config.ts
import UnoCss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 8888,
    open: true,
    https: false,
    proxy: {},
  },
  plugins: [
    Vue(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
      ],
      dts: "types/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/store",
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "types/components.d.ts",
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector({
      toggleButtonVisibility: "never",
    }),

    // https://github.com/unocss/unocss
    // see unocss.config.ts for config
    UnoCss(
      {
        configFile: resolve(__dirname, "src/config/unocss/index.ts"),
      },
    ),
  ],
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
      @import "~/styles/variables.scss";
    `,
        javascriptEnabled: true,
      },
    },
  },
});
