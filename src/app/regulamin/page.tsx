import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Zasady uczestnictwa w cyklu zajęć, odstąpienia od umowy i składania reklamacji.",
};

export default function RegulaminPage() {
  return (
    <section className="section">
      <div className="wrap wrap--mid">
        <p className="kicker">Informacje prawne</p>
        <h1 className="mt-1">Regulamin</h1>
        <p className="muted text-sm mt-2">Ostatnia aktualizacja treści: sierpień 2026.</p>

        <div className="prose mt-4">
          <h2>Czego dotyczy ten regulamin</h2>
          <p>
            Określa zasady korzystania z usługi nauki języka angielskiego online opisanej na tej stronie:
            zapis na rozmowę wstępną i cykl zajęć, odstąpienie od umowy oraz tryb składania reklamacji.
            „Cykl” oznacza czterotygodniowy blok zajęć grupowych opisany w sekcji „Jak uczymy”.
          </p>

          <h2>Jak wygląda zapis</h2>
          <p>
            Zapis zaczyna się od rozmowy wstępnej, podczas której ustalamy dominującą barierę, cele cyklu i
            dopasowujemy grupę pod względem tych celów oraz dostępnych terminów. Warunki uczestnictwa
            zostają potwierdzone przed rozpoczęciem cyklu. Dopiero wtedy dochodzi do zawarcia umowy — sama
            rozmowa wstępna niczego nie przesądza.
          </p>

          <h2>Prawo odstąpienia od umowy</h2>
          <p>
            Jeśli zawierasz umowę jako konsument, przysługuje Ci prawo odstąpienia od niej w terminie 14 dni
            od dnia jej zawarcia, bez podawania przyczyny, zgodnie z ustawą z dnia 30 maja 2014 r. o prawach
            konsumenta. Wystarczy wysłać jednoznaczne oświadczenie o odstąpieniu na adres{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Jeśli na wyraźną prośbę
            zaczynasz udział w zajęciach przed upływem tych 14 dni i cykl zostanie w tym czasie w pełni
            zrealizowany, prawo odstąpienia wygasa z chwilą pełnego wykonania usługi. O tym wygaśnięciu
            informujemy przed rozpoczęciem zajęć. W pozostałych przypadkach odstąpienie obejmuje tę część
            cyklu, która jeszcze się nie odbyła.
          </p>

          <h2>Rezygnacja między cyklami</h2>
          <p>
            Udział w kolejnym cyklu nigdy nie jest automatyczny. Każdy kolejny cykl wymaga osobnej,
            świadomej decyzji o dołączeniu. Rezygnacja z kontynuacji nie wymaga podawania powodu ani
            zachowania szczególnego terminu — poza zwykłym zgłoszeniem przed startem kolejnego cyklu.
          </p>

          <h2>Reklamacje</h2>
          <p>
            Reklamacje dotyczące przebiegu zajęć przyjmujemy na{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Warto opisać, czego dotyczy
            zastrzeżenie i czego oczekujesz w ramach jego rozpatrzenia. Odpowiadamy w ciągu 14 dni od
            otrzymania zgłoszenia. Niezależnie od tej procedury, jako konsument możesz skorzystać z
            pozasądowych sposobów rozpatrywania sporów, w tym za pośrednictwem właściwego wojewódzkiego
            inspektoratu Inspekcji Handlowej lub powiatowego (miejskiego) rzecznika konsumentów.
          </p>

          <h2>Zmiana lub odwołanie zajęć</h2>
          <p>
            Jeśli pojedyncza sesja z przyczyn leżących po naszej stronie nie może się odbyć w zaplanowanym
            terminie, proponujemy nowy termin w tym samym tygodniu. Gdy to niemożliwe, wydłużamy cykl o
            odpowiednią liczbę dni, żeby żadna sesja się nie zgubiła.
          </p>

          <h2>Odpowiedzialność</h2>
          <p>
            Dokładamy staranności, żeby zajęcia odbywały się zgodnie z ustaleniami. Nie odpowiadamy za
            przerwy w połączeniu internetowym ani problemy sprzętowe leżące po stronie uczestnika. Żaden
            zapis tego regulaminu nie wyłącza ani nie ogranicza uprawnień przysługujących konsumentom na
            mocy bezwzględnie obowiązujących przepisów prawa.
          </p>

          <h2>Prawo właściwe</h2>
          <p>
            Do umów zawieranych w ramach tego serwisu stosuje się prawo polskie. Konsument może dochodzić
            swoich roszczeń przed sądem powszechnym właściwym zgodnie z przepisami ogólnymi.
          </p>

          <h2>Zmiany regulaminu</h2>
          <p>
            O zmianach regulaminu informujemy z wyprzedzeniem osoby uczestniczące w trwającym cyklu. Zmiany
            nie wpływają na warunki cyklu, który już się rozpoczął.
          </p>
        </div>
      </div>
    </section>
  );
}
