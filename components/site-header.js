import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="LearnIND home">
        <span className="brand-mark" aria-hidden="true">
          L
        </span>
        <span className="brand-copy">
          <span className="brand-name">
            Learn<span>IND</span>
          </span>
          <span className="brand-tagline">LEARN THEN EARN</span>
        </span>
      </Link>

      <nav className="header-actions" aria-label="Main navigation">
        <Link className="button button-primary" href="/buy">
          Buy Training <span className="price">₹149</span>
        </Link>
        <Link className="button button-secondary" href="/login">
          Login
        </Link>
      </nav>
    </header>
  );
}
