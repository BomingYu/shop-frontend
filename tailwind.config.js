const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '300px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        navBarFont: ["Josefin Sans"],
        tagFont: ["Outfit"],
        bodyFont: ["Lato"],
      },
      colors: {
        darkRGBA: "rgba(6, 9, 5, 0.55)",
        lightRGBA: "rgba(100, 200, 100, 0.5)",
      },
    },
  },
  plugins: [],
};
