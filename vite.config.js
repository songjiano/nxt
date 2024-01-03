import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default ({mode}) => {
  const env = loadEnv(mode, process.cwd());

  //打包文件名称
  let fileName = "dist";
  fileName = env.VITE_APP_NAME;

  return defineConfig({
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    server: {
      port: 9999,
      host: "0.0.0.0",
    },
    base: "./",
    build: {
      outDir: fileName,
      assetsPublicPath: "./",
      target: "es2015",
    },
    plugins: [
      [vue()],
      legacy({
        targets: ["Chrome 63", "safari >= 10"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        modernPolyfills: true,
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  });
};
