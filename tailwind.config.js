const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      kAppWhite: "#FFFFFF",
      kAppDarkNavy: "#1F1D2B",
      kAppCoolGray: "#ABBBC2",
      kAppCharcoal: "#393C49",
      kAppCoral: "#EA7C69",
      kAppSlate: "#2D303E",
      kAppLightGray: "#E0E6E9",
    },
  },
};
