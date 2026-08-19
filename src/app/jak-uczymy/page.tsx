import type { Metadata } from "next";
import Link from "next/link";
import { cycleStages } from "@/content/cycle";

export const metadata: Metadata = {
  title: "Jak uczymy",
  description:
    "Dokładny przebieg czterotygodniowego cyklu: od pierwszej rozmowy diagnostycznej, przez dobór grupy, po dziennik poprawek i decyzję po czwartym tygodniu.",
};

export default function JakUczymyPage() {
  return (
    <>
      <section className="section">
        <div className="wrap wrap--mid section-head">
          <p className="kicker">Jak uczymy</p>
          <h1 className="mt-1">Metoda opisana bez skrótów</h1>
          <p className="lede">
            Poniżej dokładnie to, co dzieje się między pierwszą rozmową a końcem czwartego tygodnia. Nie
            ogólny opis na potrzeby strony, tylko realny przebieg cyklu.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap wrap--mid">
          <h2>Pierwsza rozmowa</h2>
          <div className="prose mt-2">
            <p>
              Pierwsze spotkanie trwa około czterdziestu minut i nie przypomina lekcji. To rozmowa, w
              trakcie której prowadzący celowo wprowadza kilka różnych sytuacji: opowiadanie o czymś z
              pamięci, odpowiedź na nieoczekiwane pytanie, drobną dygresję. Chodzi o to, żeby zobaczyć, gdzie
              i jak pojawia się blokada, nie tylko czy się w ogóle pojawia.
            </p>
            <p>
              Za wyraźną zgodą nagrywany bywa tylko fragment tej rozmowy, wyłącznie do sporządzenia notatek
              diagnostycznych. Nagranie kasujemy, gdy tylko notatki są gotowe. Bez zgody diagnoza przebiega
              identycznie, tylko na żywo, bez nagrania.
            </p>
            <p>
              Z tej rozmowy powstają dwa, najwyżej trzy konkretne cele na cały cykl. Celowo nie więcej.
              Więcej celów naraz zwykle oznacza, że żaden z nich nie zostanie faktycznie przećwiczony do
              końca.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--mid">
          <h2>Jak dobieramy grupę</h2>
          <div className="prose mt-2">
            <p>
              Skład grupy zależy od dominującej bariery i celu, nie wyłącznie od poziomu. Dwie osoby na
              podobnym poziomie mogą potrzebować przeciwnych ćwiczeń, więc łączenie ich wyłącznie po wyniku
              testu poziomującego mijałoby się z celem.
            </p>
            <p>
              Jeśli w danym tygodniu nie ma jeszcze kompletu osób o pasującym profilu, trafiasz na krótką
              listę oczekujących z konkretnym, przewidywanym terminem startu, a nie na czas nieokreślony.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker kicker--mint">Rytm cyklu</p>
            <h2>Cztery tygodnie krok po kroku</h2>
          </div>
          <div className="index-list index-list--4col">
            {cycleStages.map((stage) => (
              <div key={stage.week} className="index-item index-item--mint">
                <p className="index-item__index">{stage.week.toUpperCase()}</p>
                <p className="index-item__title">{stage.title}</p>
                <p className="index-item__body">{stage.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--mid">
          <h2>Dziennik poprawek z bliska</h2>
          <div className="prose mt-2">
            <p>
              To krótka wiadomość e-mail, która trafia do Ciebie w ciągu doby po sesji. Nie jest to lista
              wszystkich potknięć, tylko to, co się powtórzyło i realnie warto przećwiczyć osobno.
              Przykładowy fragment takiej wiadomości wygląda mniej więcej tak:
            </p>
            <ul>
              <li>
                wracał brak rodzajnika przed rzeczownikiem policzalnym w liczbie pojedynczej: trzy razy w
                tej samej rozmowie, m.in. „I have new project” zamiast „a new project”
              </li>
              <li>dobra wiadomość: pytania w Present Perfect zaczęły wychodzić bez wahania</li>
              <li>do przećwiczenia w tym tygodniu: „depend on”, nie „depend from”, pojawiło się dwukrotnie</li>
            </ul>
            <p>
              Po czterech takich wiadomościach widać czarno na białym, czy coś faktycznie się zmienia, czy
              tylko tak się wydaje.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap wrap--mid">
          <h2>Co się dzieje po czwartym tygodniu</h2>
          <div className="prose mt-2">
            <p>
              Wspólnie przeglądamy cztery dzienniki poprawek z całego miesiąca i rozmawiamy o tym, co się
              realnie zmieniło. Stąd trzy możliwe kierunki: kolejny cykl w tę samą stronę, jeśli cel jeszcze
              nie jest w pełni opanowany, nowy cel, jeśli poprzedni faktycznie przestał być problemem, albo
              przerwa, jeśli to akurat nie jest dobry moment na kontynuację. Każda z tych opcji jest równie
              dobrą odpowiedzią.
            </p>
          </div>
          <Link href="/kontakt" className="btn btn--primary mt-3">
            Umów pierwszą rozmowę
          </Link>
        </div>
      </section>
    </>
  );
}
