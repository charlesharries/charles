const external = { target: '_blank', rel: 'noopener noreferrer' };

export default function Links() {
  return (
    <footer className="Links">
      <p className="small-caps mb-0">Elsewhere on the web</p>
      <div className="cluster mt-sm">
        <span>
          <a className="link" href="https://github.com/charlesharries" {...external}>
            GitHub
          </a>
        </span>

        <span>
          <a className="link" href="https://twitter.com/charlesharries" {...external}>
            Twitter
          </a>
        </span>

        <span>
          <a className="link" href="https://letterboxd.com/charlesharries/" {...external}>
            Letterboxd
          </a>
        </span>
      </div>
    </footer>
  );
}
