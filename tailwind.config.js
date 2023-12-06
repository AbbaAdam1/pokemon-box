/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    screens: {
      'xs': '500px',
      ...defaultTheme.screens,
    },
  },
  plugins: [forms],
};