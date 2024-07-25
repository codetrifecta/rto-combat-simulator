/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "intense-black": "0 0 5px 5px black",
        "intense-white": "0 0 5px 5px white",
        "intense-gray": "0 0 5px 5px gray",
        "intense-red": "0 0 5px 5px red",
        "intense-green": "0 0 5px 5px green",
        "intense-blue": "0 0 5px 5px blue",
        "intense-yellow": "0 0 5px 5px yellow",

        "mild-black": "0 0 2px 2px black",
        "mild-white": "0 0 2px 2px white",
        "mild-gray": "0 0 2px 2px gray",
        "mild-red": "0 0 2px 2px red",
        "mild-green": "0 0 2px 2px green",
        "mild-blue": "0 0 2px 2px blue",
        "mild-yellow": "0 0 2px 2px yellow",
      },
    },
  },
  plugins: [],
};
