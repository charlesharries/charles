import Link from 'next/link';
import capitalise from '../../util/capitalise';

function Nav() {
  let theme = 'dark';

  if (process.browser) {
    theme = localStorage.getItem('user-color-scheme');
  }

  return (
    <nav className="Nav cluster">
      <div className="Nav__left cluster">
        <Link href="/">
          <a className="Nav__link Nav__link--blog">Home</a>
        </Link>
        <Link href="/blog">
          <a className="Nav__link Nav__link--blog">Blog</a>
        </Link>

        <div className="divider-vert"></div>

        <Link href="/sam">
          <a className="Nav__link Nav__link--blog">Sam</a>
        </Link>
        <Link href="/projects">
          <a className="Nav__link Nav__link--projects">Projects</a>
        </Link>
        <Link href="/feed.xml">
          <a className="Nav__link Nav__link--rss">RSS</a>
        </Link>

        <div className="divider-vert"></div>

        <button type="button" data-element="ThemeToggle">
          <span className="icon"></span>
          <span className="ThemeToggle__label">{capitalise(theme) || 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
