/** @type {import('tailwindcss').Config} */
const { theme } = require("./src/lib/theme.js");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: theme.colors.canvas,
        surface: theme.colors.surface,
        deep: theme.colors.deep,
        foreground: theme.colors.foreground,
        body: theme.colors.body,
        muted: theme.colors.muted,
        accent: theme.colors.accent,
        tertiary: theme.colors.tertiary,
        border: theme.colors.border,
        "btn-primary": theme.colors.buttonPrimary,
        "btn-primary-foreground": theme.colors.buttonPrimaryForeground,
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-accent": theme.gradients.accent,
        "gradient-btn": theme.gradients.button,
        "gradient-hero-bg": theme.gradients.heroBg,
        "gradient-text": theme.gradients.text,
        "gradient-text-highlight": theme.gradients.textHighlight,
      },
      boxShadow: {
        glow: theme.shadow.glow,
        "glow-accent": theme.shadow.glowAccent,
      },
      animation: {
        "slow-drift": "aurora 20s infinite alternate-reverse",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
