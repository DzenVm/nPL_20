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
            Napisz w kilku zdaniach, czego dotyczy Twoja sytuacja (praca, wyjazd, odświeżenie języka po
            dłuższej przerwie) i jakie pory dnia zwykle Ci pasują. Zaproponujemy dwa lub trzy konkretne
            terminy zamiast odsyłać Cię do formularza dostępności.
          </p>

          <h2>Zgłoszenia w imieniu zespołu</h2>
          <p>
            Jeśli piszesz w imieniu kilku osób z jednej firmy, wspomnij od razu, ile osób ma dołączyć i
            czego dotyczy ich wspólna potrzeba językowa. Przyspiesza to dobór grupy o pełen tydzień. Więcej
            w części <a href="/dla-firm">dla firm i zespołów</a>.
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
            lektorów spełniających standard opisany na stronie głównej. To usługa prowadzona na mniejszą
            skalę, bez sieci oddziałów i bez korporacyjnego zaplecza. Pełne dane rejestrowe przekazujemy na
            etapie zapisu na cykl zamiast publikować je z góry na stronie.
          </p>
        </div>
      </div>
    </section>
  );
}
