import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
base: "/ShopEase-React-Project/",
plugins: [react(), tailwindcss()],
});
