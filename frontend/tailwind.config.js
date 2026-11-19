/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coy: {
          pink: "#FF3680",
          lavender: "#E8DFFF",
          lightPink: "#FCE4EC",
          yellow: "#FFE45C",
          black: "#17141E",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        'coy': '4px 4px 0px #17141E',
        'coy-sm': '2px 2px 0px #17141E',
        'coy-lg': '6px 6px 0px #17141E',
      },
      fontFamily: {
        coy: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

