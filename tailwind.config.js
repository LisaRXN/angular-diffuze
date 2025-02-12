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
        myyellow1: "#FFDE59",
        myyellow2: "#FAF3D4",
        mygrey1: "#282828",
        mygrey2: "#494949",
        mygrey3: "#717171",
        mygrey4: "#DEDEDE",
        mygrey5: "#F9F9F9",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        paytone: ["Paytone One", "sans-serif"],
        open: ["Open Sans Variable", "sans-serif"],
        raleway: ["Raleway Variable", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontSize: {
        xxs: ".625rem",
        mega: "4rem",
      },
      boxShadow: {
        diffuze: "0 0 30px 10px rgba(255,255,255,0.6)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
