module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    'react-native/react-native': true,
    'jest/globals': true
  },
  extends: ['@react-native-community', 'plugin:react/recommended', 'prettier', 'eslint:recommended', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  plugins: ['@typescript-eslint', 'react', 'react-native', 'detox'],
  ignorePatterns: ['!.*', 'dist', 'node_modules'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error'],
    'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        arrowParens: 'avoid',
        bracketSameLine: false,
        bracketSpacing: true,
        printWidth: 160,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        'no-inline-styles': false
      }
    ],
    'react-native/no-inline-styles': 0
  },

  settings: {
    react: {
      version: 'detect'
    }
  }
};
