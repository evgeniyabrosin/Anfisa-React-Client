module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'function-rules/scope-case': [
      2, // level: error
      'always',
      parsed => {
        if (/FOROME-\d{2,}/.test(parsed.scope)) {
          return [true]
        }
        return [
          false,
          'scope should contain Jira issue reference on the round brackets, like (FOROME-111)',
        ]
      },
    ],
  },
  'react/no-namespace': 'off',
}
