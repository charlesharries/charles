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

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  productionBrowserSourceMaps: true,
  swcMinify: true,
  reactStrictMode: true,
  images: { domains: [
    'lastfm.freetls.fastly.net',
    'api.charlesharri.es',
    'charles-craft.test',
  ]},
  webpack(config, { dev, isServer }) {
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
        }),
      );
    }

    // Replace React with Preact in client production build
    // @link https://github.com/leerob/leerob.io/blob/main/next.config.js
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
      });
    }

    return config;
  },
};
