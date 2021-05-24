module.exports = {
  extends: 'eslint-config-react-config-r13v',
  rules: {
    //general
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    // typescript
    '@typescript-eslint/no-explicit-any': 'off',
    //react
    'react/jsx-no-literals': 'off',
    'react/react-in-jsx-scope': 'off',
    //prettier
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
        semi: false,
        arrowParens: 'avoid',
        bracketSpacing: true,
      },
    ],
  },
}
