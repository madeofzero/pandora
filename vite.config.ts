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
          // Replace import statements without extensions with .js
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
    plugins: [tsconfigPaths(), dts({ rollupTypes: true }), tailwindcss()],
    build: {
      sourcemap: true,
      target: "es2021",
      outDir: "dist",
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "PandoraBox",
        fileName: () => `index.js`,
        formats: ["es"],
      },
      rollupOptions: {
        plugins: [
          nodeResolve({
            extensions: [".js", ".ts"],
          }),
          // Babel only for build step (not for dev server)
          isBuild &&
            babel({
              babelHelpers: "bundled",
              extensions: [".ts", ".tsx", ".js", ".jsx"],
              include: ["src/**/*"],
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
