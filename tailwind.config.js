/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        100: "28rem",
        128: '32rem',
        700: '70rem'
      },
      width: {
        700: "70rem",
        withSidebar: 'calc(100vw - 18rem)'
      },
      maxWidth: {
        700: "70rem",
      },
    },
    fontFamily: {
      Cafe24Shiningstar: ["Cafe24Shiningstar"],
    },
  },
  plugins: [],
};

