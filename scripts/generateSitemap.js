const parse = require('date-fns/parse');
const fs = require('fs');
const path = require('path');
const posts = require('../data/published');

function isValidDate(d) {
  // eslint-disable-next-line no-restricted-globals
  return d instanceof Date && !isNaN(d);
}

function generateSitemap() {
  let rss = `<?xml version="1.0" ?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>`;

  rss += `<title>Charles Harries's Blog</title>`;
  rss += `<link>https://charlesharri.es</link>`;
  rss += `<description>Exploring the web from the North East of England.</description>`;
  rss += `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;
  rss += `<atom:link href="https://charlesharri.es/api/rss" rel="self" type="application/rss+xml" />`;

  posts.forEach(post => {
    const date = parse(`${post.date} 12:00`, "d LLL ''yy H:mm", new Date());
    const link = `https://charlesharri.es/blog/${post.slug}`;

    if (isValidDate(date)) {
      rss += `<item>
        <title>${post.title.replace('&', '&amp;')}</title>
        <pubDate>${date.toUTCString()}</pubDate>
        <link>${link}</link>
        <guid isPermaLink="false">${link}</guid>
      </item>`;
    }
  });

  rss += '</channel></rss>';

  fs.writeFileSync(path.join('./.next/static', 'feed.xml'), rss);
}

generateSitemap();