module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/return-in-computed-property': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-unused-vars': 'off',
    'vue/require-prop-type-constructor': 'off',
    'no-self-assign': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-useless-escape': 'off',
    'object-curly-spacing': 'off',
    'no-multiple-empty-lines': 'off',
    'no-irregular-whitespace': 'off'
  }
}
