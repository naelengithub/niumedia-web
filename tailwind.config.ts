import type { Config } from "tailwindcss";
import tailwindcss from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neue: ['"NeueHaasDisplay"', "sans-serif"],
      },
    },
  },
  plugins: [tailwindcss],
} satisfies Config;
