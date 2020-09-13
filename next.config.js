const withCSS = require('@zeit/next-css');
const { resolve } = require('path');
const withMdxEnhanced = require('next-mdx-enhanced');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'both',
  },
  reExportDataFetching: false,
})(
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
