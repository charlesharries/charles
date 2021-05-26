import Head from 'next/head';
import PropTypes from 'prop-types';

export const title = 'Charles Harries';
export const description =
  'Frontend Javascript developer. React, Vue, WordPress, PHP, headless CMSes, synergy, driving growth, buzzword, buzzword, buzzword.';
export const color = '#000000';
export const baseUrl = 'https://charlesharri.es';
export const image = 'https://charlesharri.es/images/cover.jpg';

export function PostHead({ frontMatter }) {
  const { title: pageTitle, description: pageDescription } = frontMatter;
  const canonical = `${baseUrl}/${frontMatter.slug}`;
  let published = null;

  if (frontMatter.date) {
    published = new Date(frontMatter.date).toISOString();
  }

  return (
    <Head>
      <title>{pageTitle} &bull; Charles Harries</title>

      <meta name="description" content={pageDescription} />

      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      {published && <meta name="article:published_time" content={published} />}
    </Head>
  );
}

PostHead.propTypes = {
  frontMatter: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    date: PropTypes.string,
  }),
};

function Meta() {
  const isDev = process.env.NODE_ENV === 'development';
  const isBrowser = typeof window !== 'undefined';

  return (
    <Head>
      <title>Charles Harries</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="msapplication-TileColor" content={color} />
      <meta name="theme-color" content={color} />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={baseUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@charlesharries" />
      <meta name="twitter:image:src" content={image} />

      <link rel="canonical" href={baseUrl} key="canonical" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/images/favicon.ico" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Libre Franklin:400,400i,700,700i&display=swap"
      />

      <link rel="dns-prefetch" href={process.env.API_ENDPOINT_URL} />

      {!isDev && isBrowser && (
        <script
          async
          defer
          data-website-id="f163f9d6-58e1-41f2-bc17-e99d4e76e8d8"
          src="https://stats.charlesharri.es/umami.js"
        ></script>
      )}
    </Head>
  );
}

export default Meta;
