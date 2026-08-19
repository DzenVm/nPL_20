import type { Metadata } from "next";
import { site } from "@/content/site";
import { CopyEmailButton } from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Jeden adres e-mail do rozmowy wstępnej, spraw organizacyjnych i pytań o dane osobowe.",
};

export default function KontaktPage() {
  return (
    <section className="section">
      <div className="wrap wrap--narrow">
        <p className="kicker">Kontakt</p>
        <h1 className="mt-1">Jeden adres e-mail, żadnego działu obsługi klienta między nami</h1>
        <p className="lede mt-3">
          Nie ma tu infolinii ani bota z menu na dziewięć opcji — jest jeden adres, na który trafiają
          zarówno zgłoszenia na rozmowę wstępną, jak i pytania organizacyjne.
        </p>

        <div className="panel mt-4">
          <p className="factor__label">Adres e-mail</p>
          <p className="mt-1 text-lg-bold">
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
          <div className="mt-2">
            <CopyEmailButton email={site.contactEmail} />
          </div>
          <p className="muted text-sm mt-2">Odpowiadamy zwykle w ciągu jednego, maksymalnie dwóch dni roboczych.</p>
        </div>

        <div className="prose mt-4">
          <h2>Chcesz umówić rozmowę wstępną</h2>
          <p>
            Napisz w kilku zdaniach, czego dotyczy Twoja sytuacja — praca, wyjazd, odświeżenie języka po
            dłuższej przerwie — i jakie pory dnia zwykle Ci pasują. Zaproponujemy dwa lub trzy konkretne
            terminy zamiast odsyłać do formularza dostępności.
          </p>

          <h2>Sprawy związane z fakturą dla firmy</h2>
          <p>
            Podaj dane firmy od razu w pierwszej wiadomości — nazwę, adres i NIP. Oszczędza to wymiany kilku
            dodatkowych e-maili, zanim wystawimy pierwszą fakturę. Więcej szczegółów na stronie{" "}
            <a href="/dla-firm">dla firm i JDG</a>.
          </p>

          <h2>Sprawy dotyczące danych osobowych</h2>
          <p>
            Pytania związane z przetwarzaniem danych i plikami cookie kieruj na ten sam adres, z dopiskiem
            „prywatność” w temacie. Pełny opis zasad znajdziesz w{" "}
            <a href="/polityka-prywatnosci">polityce prywatności</a>.
          </p>

          <h2>Kim jesteśmy</h2>
          <p>
            Zajęcia koordynuje jedna osoba, a prowadzi je niewielki, zmieniający się w czasie zespół
            lektorów spełniających standard opisany na stronie głównej — to nie duża szkoła językowa z
            siecią oddziałów, tylko usługa prowadzona na mniejszą skalę. Pełne dane rejestrowe przekazujemy
            na etapie zapisu na cykl, nie publikujemy ich z góry na stronie.
          </p>
        </div>
      </div>
    </section>
  );
}
