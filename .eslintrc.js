module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'react-app',         // uses create-react-app base rules
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    // 'prettier'         // uncomment if using Prettier
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  rules: {
    // your custom rules go here
    'react/prop-types': 'off', // disable if not using PropTypes
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off', // not needed in React 17+
  },
};
