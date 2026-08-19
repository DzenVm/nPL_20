export const pricingIncluded = [
  "Osiem sesji grupowych po 75 minut rozłożonych na cztery tygodnie",
  "Dziennik poprawek po każdej sesji",
  "Dobór grupy pod dominującą barierę i cel, nie tylko pod poziom",
  "Możliwość zmiany prowadzącego lub grupy w trakcie cyklu",
] as const;

export const pricingFactors = [
  {
    label: "Liczba osób w grupie",
    detail:
      "Cena za osobę spada przy pełnej grupie pięcioosobowej względem grupy trzyosobowej — wielkość grupy ustala się przed startem, nie w trakcie cyklu.",
  },
  {
    label: "Sesje indywidualne",
    detail:
      "Dokupione godziny 1:1 — na przykład przygotowanie do konkretnej rozmowy kwalifikacyjnej — liczone są osobno, według stawki godzinowej.",
  },
  {
    label: "Rozliczenie firmowe",
    detail:
      "Przy fakturze wystawianej na firmę cena ustalana jest indywidualnie, z uwzględnieniem danych do faktury podanych na starcie.",
  },
] as const;

export const pricingIndicative = {
  cycle: "od 560 zł za cykl czterotygodniowy",
  cycleNote: "grupa 3–5 osób, cena za osobę",
  individual: "od 110 zł za sesję indywidualną 60 minut",
} as const;

export const pricingNote =
  "Kwoty są orientacyjne — dokładną cenę potwierdzamy przed pierwszą płatnością, po rozmowie wstępnej, kiedy wiadomo już, jak liczna będzie grupa. Bez przekreślonych „starych cen” i bez promocji z limitem czasowym — cena, którą potwierdzimy na starcie, jest ceną, którą faktycznie zapłacisz.";
