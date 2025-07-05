import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        garamond: ["var(--font-eb-garamond)", "Georgia", "Times New Roman", "Times", "serif"],
        arimo: [
          "var(--font-arimo)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        script: ["Brush Script MT", "Lucida Handwriting", "Apple Chancery", "Comic Sans MS", "cursive"],
      },
      colors: {
        // Commercial brand colors from the new palette
        brand: {
          white: "#F5F5F5",
          black: "#1A1A1A",
          green: "#E5FD76",
          purple: "#8B5CF6",
          teal: "#14B8A6",
          gray: "#9CA3AF",
          "light-gray": "#F9FAFB",
        },
        // Tag colors palette
        tag: {
          purple: "#8b5cf6",
          teal: "#3ab596",
          lime: "#e0f19f",
          violet: "#9d66f1",
          lavender: "#d9c1ee",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A1A1A",
          foreground: "#F5F5F5",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          foreground: "#F5F5F5",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#9CA3AF",
          foreground: "#F5F5F5",
        },
        accent: {
          DEFAULT: "#E5FD76",
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translate3d(100%, 0, 0)" },
          "100%": { transform: "translate3d(-100%, 0, 0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 30s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
