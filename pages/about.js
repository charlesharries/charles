import React from 'react';

function About() {
  return (
    <div className="About">
      <h1>about me & this blog</h1>
      <p>
        I spend a lot of time exploring on the web, and I need a place to keep track of the things
        I've found and the ways that I've felt about stuff.
      </p>

      <h2>Tracking</h2>
      <p>
        I didn't bother tracking users for a long time, but I've become a little interested in
        whether or not people are reading what I write. So I'm tracking visits to this site using{' '}
        <a href="https://umami.is/" target="_blank">
          Umami
        </a>
        .
      </p>

      <p>
        Your data is anonymised; I can't see who you are. But if you'd like to not be tracked, you
        could turn off Javascript, or block <code>stats.charlesharri.es</code>, the domain where the
        analytics are served from.
      </p>
    </div>
  );
}

export default About;
