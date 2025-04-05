/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fa',
          100: '#e1e9f5',
          200: '#c3d3eb',
          300: '#a5bde1',
          400: '#8797d7',
          500: '#4571aa',
          600: '#3e66a0',
          700: '#375b96',
          800: '#30508c',
          900: '#294582',
        },
      },
    },
  },
  plugins: [],
} 