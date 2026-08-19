import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlockerQuiz } from "@/components/BlockerQuiz";
import { FrictionAccordion } from "@/components/FrictionAccordion";
import { CohortStartWidget, CohortStartWidgetFallback } from "@/components/CohortStartWidget";
import { audienceSegments } from "@/content/audience";
import { stuckReasons } from "@/content/stuckReasons";
import { methodPrinciples } from "@/content/method";
import { cycleStages } from "@/content/cycle";
import { practicePoints } from "@/content/practice";
import { teacherStandard } from "@/content/teachers";
import {
  pricingFactors,
  pricingIncluded,
  pricingIndicative,
  pricingNote,
} from "@/content/pricing";
import { companyPaths } from "@/content/companies";
import { threeQuestions } from "@/content/threeQuestions";
import { faq } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="section texture-dots">
        <div className="wrap split">
          <div>
            <p className="kicker">Nauka angielskiego online · Polska</p>
            <h1 className="mt-2">Zanim zaczniemy uczyć, ustalamy, co dokładnie blokuje Twój angielski</h1>
            <p className="lede mt-3">
              To kurs pomyślany dla osób, które już próbowały — czasem więcej niż raz. Małe grupy dobrane pod
              barierę i cel, czterotygodniowe cykle z jasnym końcem i dziennik poprawek, który pokazuje, czy
              coś się naprawdę zmienia.
            </p>

            <div className="cluster mt-4">
              <Link href="/kontakt" className="btn btn--primary">
                Umów rozmowę wstępną
              </Link>
              <a href="#diagnoza" className="btn btn--ghost">
                Sprawdź swoją barierę
              </a>
            </div>

            <p className="muted max-42 text-sm mt-3">
              Rozmowa wstępna nic nie kosztuje i niczego od razu nie podpisujesz — prowadzona przez
              wideorozmowę w przeglądarce, z dowolnego miejsca w Polsce.
            </p>

            <div className="mt-4">
              <Suspense fallback={<CohortStartWidgetFallback />}>
                <CohortStartWidget />
              </Suspense>
            </div>
          </div>

          <div>
            <Image
              src="/images/hero-watek.png"
              alt="Abstrakcyjna kompozycja splatających się linii zbiegających się w jednym punkcie, symbolizująca odnajdywanie wspólnego kierunku w rozmowie"
              width={1920}
              height={1080}
              priority
              sizes="(min-width: 960px) 44vw, 92vw"
              className="rounded-img"
            />
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker kicker--plum">Dla kogo</p>
            <h2>Najczęściej pasuje jedna z tych czterech sytuacji</h2>
          </div>
          <div className="grid grid--2 mt-4">
            {audienceSegments.map((segment) => (
              <div key={segment.label} className="panel">
                <p className="panel-title">{segment.label}</p>
                <p className="panel-body">{segment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STUCK */}
      <section className="section">
        <div className="wrap wrap--mid">
          <div className="section-head">
            <p className="kicker kicker--plum">Zanim zaczniemy od nowa</p>
            <h2>Sześć powodów, przez które poprzednie podejście się nie przyjęło</h2>
            <p className="lede">
              Nie po to, żeby oceniać wcześniejsze próby — po to, żeby nie powtórzyć dokładnie tego samego
              mechanizmu jeszcze raz, tylko w innym opakowaniu.
            </p>
          </div>
          <div className="index-list index-list--2col">
            {stuckReasons.map((reason, index) => (
              <div key={reason.title} className="index-item index-item--plum">
                <p className="index-item__index">{String(index + 1).padStart(2, "0")}</p>
                <p className="index-item__title">{reason.title}</p>
                <p className="index-item__body">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="split">
            <div className="section-head">
              <p className="kicker">Metoda</p>
              <h2>Dlaczego zaczynamy od diagnozy, nie od podręcznika</h2>
              <p className="lede">
                Sześć zasad, którymi faktycznie kierujemy się na zajęciach — nie tylko w opisie na tej
                stronie.
              </p>
            </div>
            <Image
              src="/images/diagnoza-fokus.png"
              alt="Abstrakcyjna ilustracja kilku cienkich linii zbiegających się do jednego wyróżnionego punktu, symbolizująca wskazanie konkretnej bariery wśród wielu możliwych"
              width={1440}
              height={1080}
              sizes="(min-width: 960px) 40vw, 92vw"
              className="rounded-img"
            />
          </div>

          <div className="index-list index-list--2col">
            {methodPrinciples.map((principle, index) => (
              <div key={principle.title} className="index-item">
                <p className="index-item__index">{String(index + 1).padStart(2, "0")}</p>
                <p className="index-item__title">{principle.title}</p>
                <p className="index-item__body">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOZA BARIERY */}
      <section id="diagnoza" className="section">
        <div className="wrap wrap--mid">
          <div className="section-head">
            <p className="kicker kicker--plum">Diagnoza bariery</p>
            <h2>Dziesięć zdań, jeden wskazany kierunek na start</h2>
            <p className="lede">
              To nie test wiedzy — zaznacz zdania, które faktycznie brzmią jak Ty, a zobaczysz, który
              mechanizm blokujący najpewniej odpowiada za milczenie w rozmowie. Wynik nie zastępuje rozmowy
              wstępnej, ale daje jej konkretny punkt startowy.
            </p>
          </div>
          <div className="panel mt-4">
            <BlockerQuiz />
          </div>
        </div>
      </section>

      {/* CYCLE */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="split split--reverse">
            <Image
              src="/images/cykl-petla.png"
              alt="Abstrakcyjna ilustracja czterech łuków ułożonych w zamkniętą pętlę, ponumerowanych od jednego do czterech, symbolizująca powtarzalny czterotygodniowy cykl nauki"
              width={1440}
              height={1080}
              sizes="(min-width: 960px) 40vw, 92vw"
              className="rounded-img"
            />
            <div className="section-head">
              <p className="kicker kicker--mint">Rytm nauki</p>
              <h2>Cztery tygodnie, które się powtarzają, dopóki to ma sens</h2>
              <p className="lede">
                Każdy cykl ma tę samą strukturę — dzięki temu widać, na jakim dokładnie etapie coś się urywa,
                jeśli w ogóle się urywa.
              </p>
            </div>
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

      {/* FRICTION POINTS */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="section-head">
              <p className="kicker kicker--plum">Punkty tarcia</p>
              <h2>Siedem miejsc, w których polska logika językowa ściera się z angielską</h2>
              <p className="lede">
                Nie chodzi o pojedyncze błędy do wykucia na pamięć, tylko o mechanizmy, które wracają, dopóki
                nie zostaną nazwane wprost. Kliknij punkt, żeby zobaczyć wyjaśnienie.
              </p>
            </div>
            <Image
              src="/images/tarcie-splot.png"
              alt="Abstrakcyjna ilustracja dwóch wiązek linii w różnych kolorach, splatających się i krzyżujących ze sobą, oznaczonych drobnymi znakami x w punktach przecięcia"
              width={1440}
              height={1080}
              sizes="(min-width: 960px) 40vw, 92vw"
              className="rounded-img"
            />
          </div>
          <div className="mt-4">
            <FrictionAccordion />
          </div>
        </div>
      </section>

      {/* PRACTICE */}
      <section className="section section--alt">
        <div className="wrap wrap--mid">
          <div className="section-head">
            <p className="kicker">Organizacja zajęć</p>
            <h2>Jak to wygląda tydzień po tygodniu</h2>
          </div>
          <div className="prose mt-3">
            <ul>
              {practicePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TEACHER STANDARD */}
      <section className="section">
        <div className="wrap">
          <div className="split split--reverse">
            <Image
              src="/images/standard-siatka.png"
              alt="Siatka drobnych ptaszków ułożonych w regularne rzędy, z jednym wyróżnionym i okrążonym ptaszkiem pośrodku, symbolizująca proces weryfikacji"
              width={1440}
              height={1080}
              sizes="(min-width: 960px) 40vw, 92vw"
              className="rounded-img"
            />
            <div>
              <p className="kicker">Standard prowadzących</p>
              <h2 className="mt-1">Kogo dopuszczamy do prowadzenia zajęć</h2>
              <div className="prose mt-2">
                {teacherStandard.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker kicker--mint">Cennik orientacyjny</p>
            <h2>Co wpływa na cenę, zanim podamy jedną liczbę</h2>
          </div>

          <div className="split split--top mt-4">
            <div>
              <h3>Co obejmuje cena</h3>
              <div className="prose mt-1">
                <ul>
                  {pricingIncluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <h3 className="mt-4">Co zmienia ostateczną kwotę</h3>
              <div className="factor-list">
                {pricingFactors.map((factor) => (
                  <div key={factor.label}>
                    <p className="factor__label">{factor.label}</p>
                    <p className="factor__detail">{factor.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel price-panel">
              <div className="price-panel__row">
                <p className="tag">Cykl czterotygodniowy</p>
                <p className="price-panel__figure">{pricingIndicative.cycle}</p>
                <p className="price-panel__sub">{pricingIndicative.cycleNote}</p>
              </div>
              <div className="price-panel__row">
                <p className="tag tag--mint">Sesje indywidualne</p>
                <p className="price-panel__figure price-panel__figure--sm">
                  {pricingIndicative.individual}
                </p>
              </div>
              <div className="price-panel__row">
                <p className="price-panel__note">{pricingNote}</p>
              </div>
              <Link href="/kontakt" className="btn btn--primary btn--block">
                Zapytaj o dokładną wycenę
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES TEASER */}
      <section className="section">
        <div className="wrap">
          <div className="split">
            <div className="section-head">
              <p className="kicker">Kto płaci, kiedy to nie Ty</p>
              <h2>Budżet szkoleniowy albo koszt działalności — obie ścieżki są częste</h2>
              <p className="lede">{companyPaths[0]?.body}</p>
              <Link href="/dla-firm" className="btn btn--ghost mt-3">
                Zobacz szczegóły dla firm i JDG →
              </Link>
            </div>
            <Image
              src="/images/firmy-warkocz.png"
              alt="Abstrakcyjna ilustracja dwóch wiązek linii w osobnych kolorach, łączących się w jedną grubszą nić, symbolizująca połączenie ścieżki indywidualnej i firmowej"
              width={1440}
              height={1080}
              sizes="(min-width: 960px) 40vw, 92vw"
              className="rounded-img"
            />
          </div>
        </div>
      </section>

      {/* THREE QUESTIONS */}
      <section className="section section--alt">
        <div className="wrap wrap--mid">
          <div className="section-head">
            <p className="kicker kicker--plum">Zanim się zapiszesz</p>
            <h2>Trzy pytania, które warto zadać na głos</h2>
          </div>
          <div className="index-list mt-4">
            {threeQuestions.map((item, index) => (
              <div key={item.question} className="index-item index-item--plum">
                <p className="index-item__index">PYTANIE {String(index + 1).padStart(2, "0")}</p>
                <p className="index-item__title">{item.question}</p>
                <p className="index-item__body">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap wrap--mid">
          <div className="section-head">
            <p className="kicker">Pytania, które faktycznie padają</p>
            <h2>Najczęstsze pytania</h2>
          </div>
          <div className="accordion mt-3">
            {faq.map((item) => (
              <details key={item.question} className="accordion__item">
                <summary>
                  <span>{item.question}</span>
                  <span className="accordion__mark" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="accordion__body">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section--deep center">
        <div className="wrap wrap--narrow">
          <h2 className="text-on-deep">Rozmowa wstępna nic nie kosztuje, decyzja zostaje przy Tobie</h2>
          <p className="center-block max-50 text-on-deep-soft mt-2">
            Bez presji sprzedażowej i bez podpisywania czegokolwiek na tym etapie — jeśli po rozmowie
            stwierdzisz, że to nie pasuje, po prostu na tym kończymy.
          </p>
          <Link href="/kontakt" className="btn btn--on-deep mt-4">
            Umów rozmowę wstępną
          </Link>
        </div>
      </section>
    </>
  );
}
