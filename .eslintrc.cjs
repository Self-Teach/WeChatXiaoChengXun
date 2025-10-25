module.exports = {
  env: {
    es2021: true,
    commonjs: true,
    node: true
  },
  globals: {
    wx: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    getApp: 'readonly',
    Component: 'readonly'
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script'
  },
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }]
  }
};
