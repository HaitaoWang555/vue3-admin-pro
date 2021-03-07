module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'vue/no-v-html': 'off',
    'vue/no-v-model-argument': 'off',
    'no-console': 'off',
    'vue/no-mutating-props': 'off',
    'no-var': 2,
  },
}
