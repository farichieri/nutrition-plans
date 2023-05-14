/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    // height: (theme) => ({
    //   auto: "auto",
    //   ...theme("spacing"),
    //   full: "100%",
    //   screen: "calc(var(--vh) * 100)",
    // }),
    // minHeight: (theme) => ({
    //   0: "0",
    //   ...theme("spacing"),
    //   full: "100%",
    //   screen: "calc(var(--vh) * 100)",
    // }),
    extend: {
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
    },
  },
  darkMode: "class",
  plugins: [],
};
