module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // activa eslint-plugin-prettier y eslint-config-prettier
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error', // marca errores de formateo
    },
  };