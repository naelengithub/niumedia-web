import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        testblue: "#084152",
        "light-blue": "var(--bg-light-blue)",
      },
      fontFamily: {
        neue: ['"NeueHaasDisplay"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
