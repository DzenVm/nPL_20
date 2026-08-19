import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Jakie dane przetwarzamy w związku z tym serwisem, w jakim celu i jakie masz w związku z tym prawa.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <section className="section">
      <div className="wrap wrap--mid">
        <p className="kicker">Informacje prawne</p>
        <h1 className="mt-1">Polityka prywatności</h1>
        <p className="muted text-sm mt-2">Ostatnia aktualizacja treści: sierpień 2026.</p>

        <div className="prose mt-4">
          <h2>Kto administruje danymi</h2>
          <p>
            Administratorem danych przetwarzanych w związku z tym serwisem jest podmiot prowadzący usługę,
            dostępny pod adresem kontaktowym <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            Pełne dane rejestrowe przekazujemy na etapie zawierania umowy o cykl zajęć, żeby nie publikować z
            góry na stronie więcej danych, niż jest na tym etapie potrzebne.
          </p>

          <h2>Jakie dane przetwarzamy i po co</h2>
          <p>
            <strong>Korespondencja i zapis na rozmowę wstępną.</strong> Jeśli piszesz do nas e-mailem,
            przetwarzamy dane, które sam podasz — zwykle imię, adres e-mail, czasem numer telefonu lub dane
            firmy przy fakturowaniu. Podstawa: podjęcie działań przed zawarciem umowy oraz jej wykonanie
            (art. 6 ust. 1 lit. b RODO).
          </p>
          <p>
            <strong>Notatki z rozmowy diagnostycznej.</strong> Z pierwszej rozmowy powstają krótkie notatki
            o zaobserwowanej barierze i ustalonych celach cyklu. Jeśli fragment rozmowy został nagrany za
            Twoją wyraźną zgodą, nagranie kasujemy zaraz po sporządzeniu notatek. Podstawa: wykonanie umowy
            (art. 6 ust. 1 lit. b RODO), a w zakresie samego nagrania — zgoda (art. 6 ust. 1 lit. a RODO).
          </p>
          <p>
            <strong>Dziennik poprawek.</strong> Cotygodniowe wiadomości z notatkami językowymi wysyłane w
            trakcie cyklu przetwarzamy wyłącznie w celu prowadzenia zajęć i tylko przez czas trwania danego
            cyklu oraz uzasadniony okres po nim. Podstawa: wykonanie umowy (art. 6 ust. 1 lit. b RODO).
          </p>
          <p>
            <strong>Wybór zgody na cookies.</strong> Twój wybór dotyczący plików cookie zapisujemy lokalnie w
            przeglądarce (localStorage), nie na naszym serwerze. Podstawa: nasz prawnie uzasadniony interes w
            zapamiętaniu tego wyboru, żeby nie pytać o niego przy każdej wizycie (art. 6 ust. 1 lit. f RODO).
          </p>
          <p>
            <strong>Znacznik reklamowy.</strong> Wyłącznie jeśli wyrazisz zgodę na cookies reklamowe,
            skrypt pomiaru konwersji Google zaczyna przekazywać Google dane o wizycie w trybie pełnym (m.in.
            adres IP, identyfikator kliknięcia w reklamę); bez tej zgody ten sam skrypt jest już wczytany w
            przeglądarce, ale działa w trybie ograniczonym i nie zapisuje plików cookie reklamowych — to
            mechanizm techniczny znany jako tryb zgody (consent mode), wymagany dla stron kierujących reklamy
            do użytkowników w Unii Europejskiej. Podstawa: zgoda (art. 6 ust. 1 lit. a RODO), którą możesz
            wycofać w każdej chwili przez odnośnik „Zarządzaj zgodą na cookies” w stopce strony. Dane w
            zakresie objętym zgodą przetwarza Google jako odrębny administrator, na zasadach opisanych we
            własnej polityce prywatności Google.
          </p>
          <p>
            <strong>Logi techniczne.</strong> Dostawca hostingu zbiera podstawowe logi serwera (adres IP,
            znacznik czasu, żądany zasób) w celach związanych z bezpieczeństwem i diagnostyką awarii. Nie
            łączymy tych logów z tożsamością konkretnej osoby. Podstawa: prawnie uzasadniony interes w
            zapewnieniu bezpieczeństwa serwisu (art. 6 ust. 1 lit. f RODO).
          </p>

          <h2>Jak długo przechowujemy dane</h2>
          <p>
            Korespondencję i dane związane z udziałem w zajęciach przechowujemy przez czas trwania
            współpracy oraz dodatkowo przez okres przedawnienia ewentualnych roszczeń. Dane firmowe potrzebne
            do faktur przechowujemy przez okres wymagany przepisami podatkowymi. Wybór zgody na cookies
            pozostaje w Twojej przeglądarce do czasu, aż go zmienisz lub wyczyścisz dane przeglądania.
          </p>

          <h2>Komu przekazujemy dane</h2>
          <p>
            Poza podmiotami technicznymi obsługującymi pocztę e-mail i hosting serwisu, dane przekazujemy
            Google — wyłącznie w zakresie znacznika reklamowego i wyłącznie w zakresie objętym Twoją zgodą.
            Nie sprzedajemy danych osobowych ani nie przekazujemy ich w celach marketingowych podmiotom
            trzecim spoza tej listy.
          </p>

          <h2>Twoje prawa</h2>
          <p>Zgodnie z RODO masz prawo do:</p>
          <ul>
            <li>dostępu do swoich danych i uzyskania ich kopii,</li>
            <li>sprostowania danych, jeśli są nieprawidłowe,</li>
            <li>usunięcia danych, gdy nie ma już podstawy do ich przetwarzania,</li>
            <li>ograniczenia przetwarzania w określonych sytuacjach,</li>
            <li>przenoszenia danych przetwarzanych na podstawie zgody lub umowy,</li>
            <li>sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie,</li>
            <li>
              wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, jeśli uznasz, że przetwarzamy
              Twoje dane niezgodnie z prawem.
            </li>
          </ul>
          <p>
            Z każdego z tych praw możesz skorzystać, pisząc na{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> z dopiskiem „prywatność” w
            temacie wiadomości.
          </p>

          <h2>Dobrowolność podania danych</h2>
          <p>
            Podanie danych jest zawsze dobrowolne, choć bez adresu e-mail nie umówimy rozmowy wstępnej ani
            nie odpowiemy na zgłoszenie — trudno to zrobić bez jakiegokolwiek sposobu kontaktu.
          </p>

          <h2>Zmiany tej polityki</h2>
          <p>
            Jeśli zmienimy sposób przetwarzania danych, zaktualizujemy tę stronę i datę na jej górze. Przy
            istotnych zmianach postaramy się poinformować o tym osoby, z którymi prowadzimy w danym momencie
            aktywną korespondencję lub zajęcia.
          </p>
        </div>
      </div>
    </section>
  );
}
