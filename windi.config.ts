import { defineConfig } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: ["**/*.{jsx,tsx,js,ts,css,html}"],
    exclude: ["node_modules", ".git", ".next"],
  },
});
