/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        // Définition des couleurs principales
        primary: "#00007A",
        secondary: "#FB9031",
        accent: "#FF4081",
        neutral: "#3D4451",
        info: "#3ABFF8",
        success: "#36D399", 
        warning: "#FBBD23",
        error: "#F87272",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize: {
        'xxs': '.625rem',
        'mega': '4rem',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
