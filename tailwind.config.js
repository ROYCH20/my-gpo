/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nekst', 'Manrope', 'sans-serif'],
      },
      colors: {
        tusur: {
          blue: '#3C388D',
          white: '#FFFFFF',
          purple: '#652580',
          green: '#9FC53A',
          lightBlue: '#36CCE8',
          blueHover: '#2D2A6E',
          purpleHover: '#4E1C63',
        }
      }
    },
  },
  plugins: [],
}