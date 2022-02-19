// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.vue'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  variants: {},
  plugins: [],
}
