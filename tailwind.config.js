/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        navBarFont:["Josefin Sans"],
        tagFont:["Outfit"],
        bodyFont:["Lato"]
      },
      colors:{
        'darkRGBA':'rgba(26, 144, 102, 0.8)',
        'lightRGBA':'rgba(176, 209, 178, 0.68)'
      }
    },
  },
  plugins: [],
};
