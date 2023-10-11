/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  daisyui:{
    themes:[{
      light: {
        // ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        primary: "#03AF48", //primary
        secondary: "#ffffff", //secondary
        accent: "#1D7643", //accent
        "base-100": "#ffffff", //bg-color
        neutral: "#400000", //textS
        info: "#6C757D", //textG
        success: "#000000", //textP
      },
    }]
  },
  plugins: [require("daisyui")], }

