module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
  },
  plugins: ['react', 'prettier', 'cypress'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      legacyDecorators: true,
    },
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'max-len': ['error', 80],
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
  },
  settings: {
    react: {
      version: require('react').version,
    },
  },
};
