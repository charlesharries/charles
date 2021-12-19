import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';

function Nav() {
  return (
    <nav className="Nav cluster">
      <div className="Nav__left cluster">
        <Link href="/">
          <a className="Nav__link Nav__link--blog">Home</a>
        </Link>
        <Link href="/blog">
          <a className="Nav__link Nav__link--blog">Blog</a>
        </Link>
        <Link href="/stream">
          <a className="Nav__link Nav__link--blog">Stream</a>
        </Link>

        <div className="divider-vert" />

        <Link href="/sam">
          <a className="Nav__link Nav__link--blog">Sam</a>
        </Link>
        <Link href="/projects">
          <a className="Nav__link Nav__link--projects">Projects</a>
        </Link>

        <div className="divider-vert" />

        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Nav;
