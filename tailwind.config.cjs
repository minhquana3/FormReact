/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        hovershadow: "0 0.5rem 1rem -0.25em rgba(0,0,0,0.3)",
      },
      screens: { smm: "375px" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
