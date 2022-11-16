/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "600px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },

    extend: {
      colors: {
        // primaryColor: "#1A5F73",
        // secondarColor: "#5CC982",
        // secondarColorHover: "#3B947B",
        primaryColor: "#0085ff",
        secondarColor: "#0061ff",
        secondarColorHover: "#f6f6f8",
        textColor: "#30404a",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
