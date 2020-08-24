import Link from 'next/link';
import './Nav.css';

function Nav() {
  return (
    <nav className="Nav">
      <div className="Nav__left">
        <Link href="/">
          <a className="Nav__link Nav__link--blog">Home</a>
        </Link>
        <Link href="/blog">
          <a className="Nav__link Nav__link--blog">Blog</a>
        </Link>
      </div>

      <div className="Nav__right">
        <Link href="/sam">
          <a className="Nav__link Nav__link--blog">Sam</a>
        </Link>
        <Link href="/bits">
          <a className="Nav__link Nav__link--bits">Bits</a>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
