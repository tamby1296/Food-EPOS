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
      // constant across themes
      kAppWhite: "#FFFFFF",
      kAppCoral: "#EA7C69",
      kAppRed: "#FF7CA3",
      // theme-reactive, see :root / :root[data-mode="light"] in index.css
      kAppDarkNavy: "var(--kAppDarkNavy)",
      kAppCoolGray: "var(--kAppCoolGray)",
      kAppCharcoal: "var(--kAppCharcoal)",
      kAppSlate: "var(--kAppSlate)",
      kAppLightGray: "var(--kAppLightGray)",
      kAppLightGray2: "var(--kAppLightGray2)",
    },
    extend: {
      fontFamily: {
        sans: ["Barlow", ...defaultTheme.fontFamily.sans],
        heading: ["Barlow", ...defaultTheme.fontFamily.serif],
      },
    },
  },
};
