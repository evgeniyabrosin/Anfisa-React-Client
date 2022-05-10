module.exports = theme => ({
  '.typography-l': {
    font: `${theme('fontSize.20')}/${theme('lineHeight.28')} ${theme(
      'fontFamily.sans',
    )}`,
  },

  '.typography-m': {
    font: `${theme('fontSize.16')}/${theme('lineHeight.24')} ${theme(
      'fontFamily.sans',
    )}`,
  },

  '.typography-s': {
    font: `${theme('fontSize.14')}/${theme('lineHeight.20')} ${theme(
      'fontFamily.sans',
    )}`,
  },

  '.typography-xs': {
    font: `${theme('fontSize.12')}/${theme('lineHeight.16')} ${theme(
      'fontFamily.sans',
    )}`,
  },

  '.typography-xxs': {
    font: `${theme('fontSize.10')}/${theme('lineHeight.16')} ${theme(
      'fontFamily.sans',
    )}`,
  },

  '.popup-card': {
    overflow: 'hidden',
    background: theme('colors.white'),
    boxShadow: theme('boxShadow.card'),
    borderRadius: theme('borderRadius.DEFAULT'),
  },
})
