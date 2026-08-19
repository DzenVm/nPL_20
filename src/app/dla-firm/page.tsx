import type { Metadata } from "next";
import Link from "next/link";
import { companyPaths, companySteps } from "@/content/companies";

export const metadata: Metadata = {
  title: "Dla firm i JDG",
  description:
    "Budżet szkoleniowy pracodawcy, koszt jednoosobowej działalności gospodarczej albo kilka osób z jednego zespołu naraz — jak rozliczamy naukę angielskiego, gdy płaci firma.",
};

export default function DlaFirmPage() {
  return (
    <>
      <section className="section">
        <div className="wrap wrap--mid section-head">
          <p className="kicker">Dla firm i JDG</p>
          <h1 className="mt-1">Kto płaci, kiedy to nie Ty</h1>
          <p className="lede">
            Spora część zgłoszeń rozliczana jest inaczej niż zwykłą płatnością prywatną — przez budżet
            szkoleniowy pracodawcy albo jako koszt własnej działalności. Poniżej konkrety, nie ogólniki.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="index-list index-list--2col">
            {companyPaths.map((path, index) => (
              <div key={path.title} className="index-item">
                <p className="index-item__index">{String(index + 1).padStart(2, "0")}</p>
                <p className="index-item__title">{path.title}</p>
                <p className="index-item__body">{path.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--mid">
          <h2>Jak to ustalić przed startem</h2>
          <p className="lede mt-2">
            Trzy kroki, które oszczędzają wymiany kilkunastu e-maili po fakcie.
          </p>
          <div className="index-list mt-4">
            {companySteps.map((step, index) => (
              <div key={step} className="index-item index-item--plum">
                <p className="index-item__index">KROK {index + 1}</p>
                <p className="index-item__body">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap wrap--mid">
          <h2>Rozliczenie i faktura</h2>
          <div className="prose mt-2">
            <p>
              Fakturę wystawiamy na podstawie danych podanych przed pierwszą płatnością — nazwa, adres, NIP.
              Jeśli w grę wchodzi kilka osób z jednego zespołu, jedna faktura zbiorcza jest możliwa, o ile
              wszystkie dane są znane z góry.
            </p>
            <p>
              Kwestie podatkowe — czy konkretny wydatek kwalifikuje się jako koszt uzyskania przychodu przy
              danej formie opodatkowania — zostawiamy własnemu księgowemu; nie doradzamy w tym zakresie, bo
              to zależy od szczegółów, których po prostu nie znamy.
            </p>
          </div>
          <Link href="/kontakt" className="btn btn--primary mt-3">
            Napisz w sprawie rozliczenia firmowego
          </Link>
        </div>
      </section>
    </>
  );
}
