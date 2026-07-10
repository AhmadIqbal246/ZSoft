const theme = {
  colors: {
    canvas: "#080808",
    surface: "#111111",
    deep: "#1a1a2e",
    foreground: "#ffffff",
    body: "#b0b0b0",
    muted: "#888888",
    accent: "#00d9ff",
    tertiary: "#7c3aed",
    border: "rgba(255, 255, 255, 0.08)",
    buttonPrimary: "#ffffff",
    buttonPrimaryForeground: "#080808",
  },
  gradients: {
    accent: "linear-gradient(135deg, #ffffff, #00d9ff)",
    button: "linear-gradient(135deg, #ffffff, #00d9ff)",
    text: "linear-gradient(90deg, #ffffff, #00d9ff)",
    textHighlight: "linear-gradient(90deg, #ffffff, #00d9ff)",
    heroBg: "radial-gradient(ellipse at 60% 50%, #1a1a2e 0%, #080808 70%)",
    cardHover: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(0, 217, 255, 0.05))",
    border: "linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(0, 217, 255, 0.3))",
    textAnimated: "linear-gradient(270deg, #ffffff, #00d9ff, #ffffff, #00d9ff, #ffffff)",
  },
  hover: {
    foreground: "#ffffff",
    accent: "#00d9ff",
    surface: "rgba(255, 255, 255, 0.1)",
    borderAccent: "rgba(0, 217, 255, 0.5)",
    borderForeground: "rgba(255, 255, 255, 0.2)",
  },
  glow: {
    foreground: "rgba(255, 255, 255, 0.25)",
    accent: "rgba(0, 217, 255, 0.2)",
    tertiary: "rgba(124, 58, 237, 0.2)",
  },
  shadow: {
    glow: "0 0 20px rgba(255, 255, 255, 0.15), 0 0 60px rgba(0, 217, 255, 0.1)",
    glowAccent: "0 0 20px rgba(0, 217, 255, 0.2), 0 0 60px rgba(0, 217, 255, 0.05)",
  },
  particles: {
    colors: ["#ffffff", "#00d9ff"],
  },
};

function hexToRgbChannels(hex) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;
  const int = parseInt(value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function rgbaFromHex(hex, alpha) {
  const { r, g, b } = hexToRgbChannels(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getCssVariables() {
  const foregroundRgb = hexToRgbChannels(theme.colors.foreground);
  const accentRgb = hexToRgbChannels(theme.colors.accent);
  const tertiaryRgb = hexToRgbChannels(theme.colors.tertiary);

  return {
    "--color-canvas": theme.colors.canvas,
    "--color-surface": theme.colors.surface,
    "--color-deep": theme.colors.deep,
    "--color-foreground": theme.colors.foreground,
    "--color-body": theme.colors.body,
    "--color-muted": theme.colors.muted,
    "--color-accent": theme.colors.accent,
    "--color-tertiary": theme.colors.tertiary,
    "--color-border": theme.colors.border,
    "--color-button-primary": theme.colors.buttonPrimary,
    "--color-button-primary-foreground": theme.colors.buttonPrimaryForeground,
    "--color-foreground-rgb": `${foregroundRgb.r}, ${foregroundRgb.g}, ${foregroundRgb.b}`,
    "--color-accent-rgb": `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`,
    "--color-tertiary-rgb": `${tertiaryRgb.r}, ${tertiaryRgb.g}, ${tertiaryRgb.b}`,
    "--gradient-accent": theme.gradients.accent,
    "--gradient-button": theme.gradients.button,
    "--gradient-text": theme.gradients.text,
    "--gradient-text-highlight": theme.gradients.textHighlight,
    "--gradient-hero-bg": theme.gradients.heroBg,
    "--gradient-card-hover": theme.gradients.cardHover,
    "--gradient-border": theme.gradients.border,
    "--gradient-text-animated": theme.gradients.textAnimated,
    "--color-glow-foreground": theme.glow.foreground,
    "--color-glow-accent": theme.glow.accent,
    "--color-glow-tertiary": theme.glow.tertiary,
    "--color-hover-surface": theme.hover.surface,
    "--color-hover-border-accent": theme.hover.borderAccent,
    "--color-hover-border-foreground": theme.hover.borderForeground,
    "--shadow-glow": theme.shadow.glow,
    "--shadow-glow-accent": theme.shadow.glowAccent,
    "--blob-foreground": `radial-gradient(circle, ${rgbaFromHex(theme.colors.foreground, 0.35)} 0%, transparent 70%)`,
    "--blob-accent": `radial-gradient(circle, ${rgbaFromHex(theme.colors.accent, 0.25)} 0%, transparent 70%)`,
    "--blob-foreground-soft": `radial-gradient(circle, ${rgbaFromHex(theme.colors.foreground, 0.2)} 0%, transparent 70%)`,
    "--blob-accent-soft": `radial-gradient(circle, ${rgbaFromHex(theme.colors.accent, 0.15)} 0%, transparent 70%)`,
    "--blob-deep": `radial-gradient(circle, ${rgbaFromHex(theme.colors.deep, 0.6)} 0%, transparent 70%)`,
  };
}

module.exports = {
  theme,
  getCssVariables,
  hexToRgbChannels,
  rgbaFromHex,
  default: theme,
};
