const themeColors = require('./src/theme/colors.js')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...themeColors,
      blue: { ...themeColors.blue },
      grey: { ...themeColors.grey },
    },
    fontFamily: {
      sans: ['"Roboto"', 'sans-serif'],
    },
  },
  variants: {
    appearance: [],
  },
  corePlugins: {
    corePlugins: ['margin', 'padding'],
  },
}
