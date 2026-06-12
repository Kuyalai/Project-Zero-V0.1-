import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f6f7fb",
        line: "#d7ddea",
        calm: {
          50: "#eefbf8",
          100: "#d7f4ed",
          200: "#a8e7db",
          300: "#73d7c3",
          400: "#43bea7",
          500: "#239884",
          600: "#1c7a6c",
          700: "#1d625b",
        },
        sand: {
          50: "#fffaf3",
          100: "#fef0d8",
          200: "#fde0b0",
          300: "#f8c97b",
          400: "#efab44",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        lift: "0 18px 42px rgba(15, 23, 42, 0.12)",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
