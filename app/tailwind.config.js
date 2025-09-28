/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f38e1a",
        secondary: "#2a9d8f",
        support: "#34495E",


        background: "#ffffff",
        white: "#FFFFFF",
      },
      container: {
        container: "16px",
      },
      padding: {
        "container": "16px",
      },
      borderRadius: {
        DEFAULT: 8,
        sm: 4,
        lg: 16,
      }
    },
  },
  plugins: [],
}