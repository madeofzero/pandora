import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8")
);
const version = pkg.version;

export default defineConfig({
  root: "src",
  plugins: [tsconfigPaths(), dts({ rollupTypes: true }), tailwindcss()],
  build: {
    target: "es2015",
    outDir: `../dist/@${version}`,
    lib: {
      entry: {
        "pandora-box": resolve(__dirname, "src/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        entryFileNames: `[name].js`,
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
