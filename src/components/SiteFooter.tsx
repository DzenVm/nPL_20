import Link from "next/link";
import { legalLinks, navLinks, site } from "@/content/site";
import { CurrentYear } from "@/components/CurrentYear";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__top">
        <div>
          <p className="site-footer__heading">O serwisie</p>
          <p className="site-footer__lede">
            Jeden mechanizm: znaleźć, co konkretnie blokuje mówienie po angielsku, i systematycznie to
            rozmontować w małej grupie — nie kolejny ogólny program od podstaw.
          </p>
        </div>

        <div>
          <p className="site-footer__heading">Serwis</p>
          <ul className="site-footer__list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/">Strona główna</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="site-footer__heading">Informacje prawne</p>
          <ul className="site-footer__list">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </li>
            <li>
              <ManageCookiesButton />
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap site-footer__bottom">
        <p>
          © <CurrentYear /> · treści na tej stronie mają charakter edukacyjny i informacyjny.
        </p>
        <p>Zajęcia prowadzone zdalnie, dostępne z całej Polski.</p>
      </div>
    </footer>
  );
}
