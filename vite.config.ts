import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const __dirname = dirname(fileURLToPath(import.meta.url));

function addJsExtensionPlugin() {
  return {
    name: "add-js-extension",
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle) as any) {
        if (file.type === "chunk") {
          file.code = file.code.replace(
            /import(\s+[^'"]+from\s+['"])([^'".]+)(?<!\.js)['"]/g,
            (match, importPart, path) => {
              if (path.startsWith("./") || path.startsWith("../")) {
                return `${importPart}${path}.js"`;
              }
              return match;
            }
          );
        }
      }
    },
  };
}
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    root: ".",
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      dts({
        outDir: "dist",
        include: ["src/web"],
        rollupTypes: true,
      }),
    ],
    build: {
      sourcemap: true,
      target: "es2021",
      outDir: "dist",
      lib: false,
      rollupOptions: {
        input: {
          web: resolve(__dirname, "src/web/index.ts"),
        },
        output: [
          {
            format: "es",
            dir: "dist",
            entryFileNames: "[name]/index.js",
            chunkFileNames: "shared/[name]-[hash].js",
          },
        ],
        external: [],
        plugins: [
          nodeResolve({
            extensions: [".js", ".ts"],
          }),
          isBuild &&
            babel({
              babelHelpers: "bundled",
              extensions: [".ts", ".js"],
              include: ["src/web/**/*"],
            }),
          addJsExtensionPlugin(),
        ].filter(Boolean),
      },
    },
    server: {
      open: "/dev.html",
    },
  };
});
