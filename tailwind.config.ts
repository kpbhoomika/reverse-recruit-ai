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
        apple: {
          bg: "#FFFFFF",
          alt: "#F5F5F7",
          dark: "#000000",
          cardDark: "#1D1D1F",
          text: "#1D1D1F",
          subtext: "#6E6E73",
          accent: "#0071E3",
          accentHover: "#0077ED",
          border: "#D2D2D7",
          borderLight: "rgba(0, 0, 0, 0.08)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        apple: "18px",
        "apple-lg": "24px",
      },
      boxShadow: {
        apple: "0 4px 24px rgba(0, 0, 0, 0.04)",
        "apple-lg": "0 12px 40px rgba(0, 0, 0, 0.06)",
        "apple-dark": "0 20px 60px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
