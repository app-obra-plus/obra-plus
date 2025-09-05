/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f38e1a",
        primaryLight: "#34495E",
        // secondary: "#AAB7B8",

        // accent: "#E67E22",
        // success: "#27AE60",
        // warning: "#F39C12",
        // error: "#C0392B",

        // background: "#F2F2F2",
        // card: "#FFFFFF",
        // border: "#D5D8DC",

        // textPrimary: "#2C3E50",
        // textSecondary: "#7F8C8D",

        white: "#FFFFFF",
        // black: "#000000",
      },
      container: {
        container: "16px",
      },
      padding: {
        "container": "16px",
      }
    },
  },
  plugins: [],
}