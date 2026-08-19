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
          950: "#0E0407",
          900: "#16070B",
          800: "#1F0C12",
          700: "#2B1119",
          600: "#3D1722",
          DEFAULT: "#16070B",
        },
        cream: {
          50: "#FDFCF9",
          100: "#F7F4EC",
          200: "#EFEAE0",
          300: "#E2D9CB",
          DEFAULT: "#F7F4EC",
        },
        crimson: {
          DEFAULT: "#D91C44",
          hover: "#BD1438",
          bright: "#FF2B56",
          muted: "rgba(217, 28, 68, 0.1)",
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
        foreground: "#1C0A0F",
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
        warm: "0 10px 30px -5px rgba(22, 7, 11, 0.05), 0 0 0 1px rgba(22, 7, 11, 0.04)",
        "warm-lg": "0 20px 45px -10px rgba(22, 7, 11, 0.08), 0 0 0 1px rgba(22, 7, 11, 0.05)",
        "wine-glow": "0 20px 50px rgba(14, 4, 7, 0.5)",
        "crimson-glow": "0 6px 20px rgba(217, 28, 68, 0.25)",
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
