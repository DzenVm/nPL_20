import type { Metadata } from "next";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description: "Jakich plików cookie i podobnych technologii używamy oraz jak zmienić swój wybór.",
};

export default function PolitykaCookiesPage() {
  return (
    <section className="section">
      <div className="wrap wrap--mid">
        <p className="kicker">Informacje prawne</p>
        <h1 className="mt-1">Polityka cookies</h1>

        <div className="prose mt-4">
          <h2>Czym są pliki cookie i localStorage</h2>
          <p>
            To niewielkie fragmenty danych zapisywane w Twojej przeglądarce. Ten serwis korzysta głównie z
            localStorage (przechowywanie danych w przeglądarce bez terminu ważności, dopóki go sam nie
            wyczyścisz) oraz, po zgodzie, z plików cookie ustawianych przez skrypt pomiarowy Google.
          </p>

          <h2>Jakich używamy</h2>
          <p>
            <strong>Niezbędne.</strong> Jeden wpis w localStorage zapamiętujący Twój wybór dotyczący zgody na
            cookies reklamowe. Bez niego baner zgody pojawiałby się przy każdej wizycie. Ładowany zawsze,
            niezależnie od wyboru.
          </p>
          <p>
            <strong>Reklamowe / pomiarowe.</strong> Skrypt Google (gtag.js) ładuje się przy każdej wizycie w
            trybie zgodnym z tzw. Consent Mode. Domyślnie wszystkie sygnały zgody są ustawione na
            „odmówiono”, więc skrypt nie zapisuje plików cookie reklamowych ani nie przekazuje Google danych
            pozwalających Cię zidentyfikować. Dopiero po kliknięciu „Akceptuj wszystkie” w banerze, albo w
            ustawieniach opisanych niżej, te sygnały zmieniają się na „udzielono”, skrypt zapisuje pliki
            cookie i przekazuje Google dane potrzebne do pomiaru skuteczności kampanii reklamowych.
          </p>

          <h2>Jak zmienić swój wybór</h2>
          <p>
            W dowolnym momencie możesz otworzyć ponownie panel wyboru przyciskiem „Zarządzaj zgodą na
            cookies” w stopce każdej podstrony. Poniżej ten sam przycisk dla wygody:
          </p>
          <p>
            <ManageCookiesButton />
          </p>
          <p>
            Możesz też po prostu wyczyścić dane przeglądania dla tej strony w ustawieniach przeglądarki.
            Baner zgody pojawi się ponownie przy kolejnej wizycie.
          </p>

          <h2>Więcej informacji</h2>
          <p>
            Pełny opis tego, jakie dane i na jakiej podstawie przetwarzamy, znajduje się w{" "}
            <a href="/polityka-prywatnosci">polityce prywatności</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
