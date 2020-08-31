import Head from 'next/head';

function Meta() {
  const title = 'Charles Harries';
  const description =
    'Frontend Javascript developer. React, Vue, WordPress, PHP, headless CMSes, synergy, driving growth, buzzword, buzzword, buzzword.';
  const color = '#000000';
  const baseUrl = 'https://charlesharri.es';
  const image = '/images/cover.jpg';

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <Head>
      <title>Charles Harries</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="msapplication-TileColor" content={color} />
      <meta name="theme-color" content={color} />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="dcterms.Contributor" content={title} />
      <meta name="dcterms.Coverage" content={baseUrl} />
      <meta name="dcterms.Creator" content={title} />
      <meta name="dcterms.Description" content={description} />
      <meta name="dcterms.Format" content="text/html" />
      <meta name="dcterms.Identifier" content={baseUrl} />
      <meta name="dcterms.Language" content="en_GB" />
      <meta name="dcterms.Publisher" content={title} />
      <meta name="dcterms.Type" content="website" />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="og:locale" content="en_GB" />
      <meta name="og:site_name" content={title} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={baseUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={baseUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@charlesharries" />
      <meta name="twitter:image:src" content={image} />

      <link rel="canonical" href={baseUrl} key="canonical" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/images/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/images/favicon.ico" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Libre Franklin:400,400i,700,700i&display=swap"
      />

      <link rel="dns-prefetch" href={process.env.API_ENDPOINT_URL} />

      {!isDev && (
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
