import path from "path";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../.env") });

// Log the API URL being used
console.log(
    "\x1b[36m%s\x1b[0m",
    `Using API Base URL: ${process.env.VITE_API_BASE_URL || "http://localhost:3000"}`
);

// https://vite.dev/config/
export default defineConfig({
    plugins: [wasm(), topLevelAwait(), react()],
    define: {
        "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
            process.env.VITE_API_BASE_URL || "http://localhost:3000"
        ),
    },
    optimizeDeps: {
        exclude: ["onnxruntime-node", "@anush008/tokenizers"],
    },
    build: {
        commonjsOptions: {
            exclude: ["onnxruntime-node", "@anush008/tokenizers"],
        },
        rollupOptions: {
            external: ["onnxruntime-node", "@anush008/tokenizers"],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: true,
        proxy: {
            "/api": {
                target:
                    process.env.VITE_API_BASE_URL ||
                    `http://localhost::${process.env.SERVER_PORT || 3000}`,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
