const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const { resolve } = require('path');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = {
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
};

module.exports = withPlugins(
  [withCSS, [withMDX, { pageExtensions: ['js', 'jsx', 'mdx'] }]],
  nextConfig
);
