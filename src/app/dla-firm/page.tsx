import type { Metadata } from "next";
import Link from "next/link";
import { companyPaths, companySteps } from "@/content/companies";

export const metadata: Metadata = {
  title: "Dla firm i zespołów",
  description:
    "Jak wygląda cykl, gdy zgłasza się od razu kilka osób z jednej firmy albo freelancer pracujący z zagranicznymi klientami.",
};

export default function DlaFirmPage() {
  return (
    <>
      <section className="section">
        <div className="wrap wrap--mid section-head">
          <p className="kicker">Dla firm i zespołów</p>
          <h1 className="mt-1">Kiedy zgłasza się zespół, nie tylko jedna osoba</h1>
          <p className="lede">
            Część zgłoszeń od razu obejmuje kilka osób z jednej firmy albo dotyczy pracy, w której angielski
            jest jednym z narzędzi, a nie celem samym w sobie. Poniżej, jak to wtedy wygląda w praktyce.
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
          <h2>Zróżnicowany poziom w jednym zespole</h2>
          <div className="prose mt-2">
            <p>
              W grupach firmowych poziom bywa bardziej rozstrzelony niż w grupach otwartych. Zgłasza się
              osoba po filologii obok kogoś, kto ostatni raz uczył się angielskiego w liceum. Zamiast
              ściągać wszystkich do wspólnego mianownika, dzielimy taki zespół na dwa mniejsze cykle
              prowadzone równolegle, z podobnym zestawem scenariuszy zawodowych, ale innym tempem i punktem
              startowym.
            </p>
            <p>
              Jeśli to jedna, dwuosobowa różnica poziomu, zwykle wystarczy dobranie ćwiczeń w ramach jednej
              grupy — dopiero przy wyraźnym rozstrzale sensowny jest osobny cykl.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap wrap--mid">
          <h2>Jak to ustalić przed startem</h2>
          <p className="lede mt-2">Trzy rzeczy, które warto opisać już w pierwszej wiadomości.</p>
          <div className="index-list mt-4">
            {companySteps.map((step, index) => (
              <div key={step} className="index-item index-item--plum">
                <p className="index-item__index">KROK {index + 1}</p>
                <p className="index-item__body">{step}</p>
              </div>
            ))}
          </div>
          <Link href="/kontakt" className="btn btn--primary mt-4">
            Napisz o swoim zespole
          </Link>
        </div>
      </section>
    </>
  );
}
