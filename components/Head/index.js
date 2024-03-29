import Head from "next/head";
import PropTypes from "prop-types";

export const title = "Charles Harries";
export const description =
  "I'm a developer in the North East of England, working on the web at NHS Digital.";
export const color = "#222222";
export const baseUrl = "https://charlesharri.es";
export const image = "https://charlesharri.es/images/cover.jpg";

export function PostHead({ frontMatter }) {
  const { title: pageTitle, description: pageDescription = description } = frontMatter;
  const canonical = `${baseUrl}/${frontMatter.slug}`;
  let published = null;

  if (frontMatter.date) {
    published = new Date(frontMatter.date).toISOString();
  }

  return (
    <Head>
      <title>{pageTitle} &bull; Charles Harries</title>

      <meta name="description" key="description" content={pageDescription} />
      <meta name="theme-color" key="theme-color" content={color} />

      <meta property="og:description" key="og:description" content={pageDescription} />
      <meta property="og:image" key="og:image" content={image} />
      <meta property="og:title" key="og:title" content={pageTitle} />
      <meta property="og:url" key="og:url" content={canonical} />

      <meta name="twitter:url" key="twitter:url" content={canonical} />
      <meta name="twitter:title" key="twitter:title" content={pageTitle} />
      <meta name="twitter:description" key="twitter:description" content={pageDescription} />
      <meta name="twitter:image" key="twitter:image" content={image} />

      <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="RSS Feed" />

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
  const isDev = process.env.NODE_ENV === "development";
  const isBrowser = typeof window !== "undefined";

  return (
    <Head>
      <title>Charles Harries</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="msapplication-TileColor" content={color} />
      <meta name="title" content={title} key="title" />
      <meta name="description" key="description" content={description} />
      <meta name="theme-color" key="theme-color" content={color} />
      <meta property="og:description" key="og:description" content={description} />
      <meta property="og:image" key="og:image" content={image} />
      <meta property="og:locale" key="og:locale" content="en_GB" />
      <meta property="og:site_name" key="og:site_name" content={title} />
      <meta property="og:title" key="og:title" content={title} />
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:url" key="og:url" content={baseUrl} />
      <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" key="twitter:site" content={baseUrl} />
      <meta name="twitter:title" key="twitter:title" content={title} />
      <meta name="twitter:description" key="twitter:description" content={description} />
      <meta name="twitter:creator" key="twitter:creator" content="@charlesharries" />
      <meta name="twitter:image:src" key="twitter:image:src" content={image} />

      <link rel="canonical" href={baseUrl} key="canonical" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="RSS Feed" />

      {!isDev && isBrowser && (
        <script
          async
          defer
          data-website-id="f163f9d6-58e1-41f2-bc17-e99d4e76e8d8"
          src="https://stats.charlesharri.es/umami.js"
        />
      )}
    </Head>
  );
}

export default Meta;
