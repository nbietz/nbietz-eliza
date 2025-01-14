import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

// Log the API URL being used
console.log(
    "\x1b[36m%s\x1b[0m",
    `Using API Base URL: ${process.env.VITE_API_BASE_URL || "http://localhost:3000"}`
);

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 1024,
        }),
    ],
    define: {
        "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
            process.env.VITE_API_BASE_URL || "http://localhost:3000"
        ),
    },
    clearScreen: false,
    build: {
        outDir: "dist",
        minify: true,
        cssMinify: true,
        sourcemap: false,
        cssCodeSplit: true,
    },
    resolve: {
        alias: {
            "@": "/src",
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
