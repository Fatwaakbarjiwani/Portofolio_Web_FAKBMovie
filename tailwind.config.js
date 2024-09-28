/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Montserrat: ["Montserrat", "sans - serif"],
        Madimi: ["Madimi One", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#2D2424",
        second: "#F5F5DC",
        thirt: "#A58D7F",
        fourth: "#DAA520",
        hover_colour: "#8B4513",
        border_sparrow: "#4E3620",
      },
      fontSize: {
        y: "40px",
      },
      screens: {
        xs: "370px",
        as: "240px",
        bs: "380px",
        cs: "490px",
        ds: "1200px",
      },
      boxShadow: {
        "card-3d":
          "3px 3px 10px rgba(218, 165, 32, 0.5), 6px 6px 20px rgba(218, 165, 32, 0.4), 9px 9px 30px rgba(218, 165, 32, 0.3)",
        "card-3d-hover":
          "0px 2px 10px rgba(218, 165, 32, 0.6), 0px 5px 8px rgba(218, 165, 32, 0.5), 0px 5px 8px rgba(218, 165, 32, 0.4)",
      },
      dropShadow: {
        "text-bottom-hover": "0px 4px 6px rgba(218, 165, 32, 0.5)", // bayangan ke arah bawah
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-stroke": {
          "-webkit-text-stroke": "1px #DAA520",
          color: "#F5F5DC",
        },
        ".text-stroke2": {
          "-webkit-text-stroke": "1/2px #DAA520",
          color: "#F5F5DC",
        },
        ".shadow-card": {
          "box-shadow": " 0 6px 10px #DAA520",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
