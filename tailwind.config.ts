import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          950: "#1A0308",
          900: "#2B050E",
          800: "#3D0814",
          700: "#520B1B",
          600: "#6B0E24",
          DEFAULT: "#3D0814",
        },
        cream: {
          50: "#FCFAF6",
          100: "#F7F3EA",
          200: "#F0E9DC",
          300: "#E4D9C5",
          DEFAULT: "#F7F3EA",
        },
        crimson: {
          DEFAULT: "#D91C44",
          hover: "#BF1338",
          bright: "#FF2B56",
          muted: "rgba(217, 28, 68, 0.12)",
        },
        warmGray: {
          100: "#F3EFE6",
          200: "#E6DFD3",
          300: "#C8BFB0",
          400: "#9C9080",
          500: "#706556",
          600: "#50473C",
          700: "#383129",
          800: "#241F1A",
          900: "#181411",
        },
        foreground: "#2B050E",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Plus Jakarta Sans"',
          '"Inter"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        serif: [
          '"Newsreader"',
          '"Playfair Display"',
          '"Editorial New"',
          '"Georgia"',
          "serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        warm: "0 10px 35px -5px rgba(61, 8, 20, 0.06), 0 0 0 1px rgba(61, 8, 20, 0.04)",
        "warm-lg": "0 20px 45px -10px rgba(61, 8, 20, 0.1), 0 0 0 1px rgba(61, 8, 20, 0.06)",
        "wine-glow": "0 20px 50px rgba(61, 8, 20, 0.35)",
        "crimson-glow": "0 8px 25px rgba(217, 28, 68, 0.3)",
      },
      borderRadius: {
        "2xl": "18px",
        "3xl": "24px",
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};

export default config;
