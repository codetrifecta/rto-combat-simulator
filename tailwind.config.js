/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "intense-green": "0 0 5px 5px green",
        "intense-red": "0 0 5px 5px red",
      },
    },
  },
  plugins: [],
};
