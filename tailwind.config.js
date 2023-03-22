/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js}",],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 4s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": {
            "background-position": "-64rem",
          },
          "100%": {
            "background-position": "64rem",
          },
        },
      },
      fontFamily: {
        "fira-code": ["Fira Code", "monospace"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
