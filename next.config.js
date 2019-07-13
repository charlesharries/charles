const withCSS = require('@zeit/next-css');
const { resolve } = require('path');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX(
  withCSS({
    pageExtensions: ['js', 'jsx', 'mdx'],
    webpack(config) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '~pages': resolve(__dirname, 'pages'),
        '~components': resolve(__dirname, 'components'),
        '~css': resolve(__dirname, 'assets', 'css'),
        '~data': resolve(__dirname, 'data'),
      };

      return config;
    },
  })
);
