const resolver = require('postcss-import-alias-resolver');
const { resolve } = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      resolve: resolver({
        alias: {
          css: resolve(__dirname, 'assets/css'),
          node_modules: resolve(__dirname, 'node_modules'),
        },
        extensions: ['.css'],
        modules: ['assets/css'],
      }),
    },
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-calc': {},
    'postcss-nested': {},
    'postcss-color-mod-function': {},
    'postcss-preset-env': {},
    'postcss-custom-media': {},
  },
  preset: {
    stage: 1,
    browsers: ['last 2 versions', 'ie >= 11'],
  },
};
