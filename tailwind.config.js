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
    screens: {
      xl2: { max: '1535px' }, // => @media (max-width: 1535px) { ... }
      xl: { max: '1279px' }, // => @media (max-width: 1279px) { ... }
      lg: { max: '1023px' }, // => @media (max-width: 1023px) { ... }
      // Excluded
      // 'md': { max: '767px' }, // => @media (max-width: 767px) { ... }
      // 'sm': { max: '639px' }, // => @media (max-width: 639px) { ... }
    },
  },
  variants: {
    appearance: [],
  },
  corePlugins: {
    corePlugins: ['margin', 'padding'],
  },
}
