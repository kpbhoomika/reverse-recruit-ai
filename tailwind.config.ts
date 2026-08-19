import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090E",
        foreground: "#F1F5F9",
        surface: {
          50: "#0B0F17",
          100: "#0E1420",
          200: "#131B2B",
          300: "#1A2438",
          400: "#24324D",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.07)",
          light: "rgba(255, 255, 255, 0.12)",
          accent: "rgba(56, 189, 248, 0.25)",
        },
        cyan: {
          glow: "#38BDF8",
          DEFAULT: "#0284C7",
          bright: "#00F0FF",
        },
        emerald: {
          glow: "#34D399",
          DEFAULT: "#10B981",
        },
        amber: {
          glow: "#FBBF24",
          DEFAULT: "#F59E0B",
        },
        muted: {
          DEFAULT: "#94A3B8",
          foreground: "#64748B",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"Inter"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          '"Fira Code"',
          "Menlo",
          "monospace",
        ],
        editorial: [
          '"Newsreader"',
          '"Editorial New"',
          '"Georgia"',
          "serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.035em",
        tight: "-0.025em",
        wide: "0.02em",
        widest: "0.08em",
      },
      borderRadius: {
        "2xl": "18px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glow: "0 0 50px -10px rgba(56, 189, 248, 0.15)",
        "glow-emerald": "0 0 50px -10px rgba(16, 185, 129, 0.15)",
        elevated: "0 20px 50px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.03)" },
        },
        beam: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-subtle": "pulseSubtle 6s ease-in-out infinite",
        beam: "beam 3s linear infinite",
        radar: "radar 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
