const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { resolve } = require('path');

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA || VERCEL_GITLAB_COMMIT_SHA || VERCEL_BITBUCKET_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;

module.exports = {
  productionBrowserSourceMaps: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack(config, { dev, isServer }) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': resolve(__dirname),
      '~pages': resolve(__dirname, 'pages'),
      '~components': resolve(__dirname, 'components'),
      '~css': resolve(__dirname, 'assets', 'css'),
      '~data': resolve(__dirname, 'data'),
    };

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: '.next',
          ignore: ['node_modules'],
          urlPrefix: '~/_next',
          release: COMMIT_SHA,
        })
      );
    }

    // Replace React with Preact in client production build
    // @link https://github.com/leerob/leerob.io/blob/main/next.config.js
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
      });
    }

    return config;
  },
};
