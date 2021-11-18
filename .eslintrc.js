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
    curly: ['error', 'multi-line'],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Style imports
          ['^.+\\.s?css$'],
          // react related packages, other packages
          ['^react', '(\\w-/)*'],
          // Side effect imports, Alias, Relative
          [
            '^\\u0000',
            '^@declarations',
            '^@core',
            '^@i18n',
            '^@theme',
            '^@store',
            '^@router',
            '^@icons',
            '^@ui',
            '^@',
            '^\\.',
          ],
        ],
      },
    ],
    'unicorn/filename-case': 'off',
    // typescript
    '@typescript-eslint/no-explicit-any': 'off',
    //react
    'react/jsx-no-literals': 'off',
    'react/react-in-jsx-scope': 'off',
    'jest/expect-expect': 'off',
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
