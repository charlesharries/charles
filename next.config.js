const withCSS = require('@zeit/next-css');
const { resolve } = require('path');

module.exports = withCSS({
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '~pages': resolve(__dirname, 'pages'),
      '~components': resolve(__dirname, 'components'),
      '~css': resolve(__dirname, 'assets', 'css'),
      '~util': resolve(__dirname, 'util'),
      '~config': resolve(__dirname, 'config'),
    };

    return config;
  },
});
