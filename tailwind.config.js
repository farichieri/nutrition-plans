/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "tertiary-color": "var(--tertiary-color)",
      },
      width: {
        xxs: "16rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      maxHeight: {
        0: "0",
        "25vh": "25vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "75vh": "75vh",
        "80vh": "80vh",
        "90vh": "90vh",
        full: "100vh",
      },
      maxWidth: {
        xxs: "16rem",
        xs: "20rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xxs: "320px",
        xs: "360px",
        s: "400px",
      },
      keyframes: {
        flash: {
          "0%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.2" },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        flash: "flash 1.4s infinite linear",
      },
      gridTemplateColumns: {
        fluid_lg: "repeat(auto-fit, minmax(25rem, 1fr))",
        fluid_sm: "repeat(auto-fit, minmax(10rem, 1fr))",
        fluid_xs: "repeat(auto-fit, minmax(8rem, 1fr))",
        fluid: "repeat(auto-fit, minmax(12rem, 1fr))",
      },
      zIndex: {
        100: 100,
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
