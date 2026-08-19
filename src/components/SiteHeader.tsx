import Link from "next/link";
import { navLinks } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <nav className="site-header__nav" aria-label="Nawigacja główna">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-header__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/kontakt" className="btn btn--primary site-header__cta">
            Umów rozmowę wstępną
          </Link>

          <details className="site-header__mobile">
            <summary className="site-header__mobile-toggle" aria-label="Otwórz menu">
              Menu
            </summary>
            <nav className="site-header__mobile-nav" aria-label="Nawigacja mobilna">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
                <li className="site-header__mobile-cta">
                  <Link href="/kontakt">Umów rozmowę wstępną</Link>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
