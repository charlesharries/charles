const fs = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Charles Harries | Blog',
    site_url: 'https://charlesharri.es',
    feed_url: 'https://charlesharri.es/feed.xml',
  });

  const posts = fs.readdirSync(path.join(__dirname, '..', 'data', 'blog'));

  posts
    .filter(name => name.includes('.mdx'))
    .map(name => {
      const content = fs.readFileSync(path.join(__dirname, '..', 'data', 'blog', name));
      const frontmatter = matter(content);

      return {
        title: frontmatter.data.title,
        url: `https://charlesharri.es/blog/${name.replace(/\.mdx?/, '')}`,
        date: frontmatter.data.date,
        description: frontmatter.data.description,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(p => feed.item(p));

  fs.writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
