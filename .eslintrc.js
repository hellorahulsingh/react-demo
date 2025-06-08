module.exports = {
  extends: [
    'react-app',                 // includes react, react-hooks, jsx-a11y
    'react-app/jest',            // for jest environment
    // 'plugin:prettier/recommended', // optionally enable Prettier
  ],
  rules: {
    // add custom rules here
    'no-console': 'warn',
    'react/prop-types': 'off',
  },
};
