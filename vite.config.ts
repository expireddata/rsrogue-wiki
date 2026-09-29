import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base + hash routing: works on any GitHub Pages path without extra config.
export default defineConfig({ base: "./", plugins: [react()] });
