export type BlockerId =
  | "hamulec-gramatyczny"
  | "cichy-slownik"
  | "mgla-sluchowa"
  | "wieczny-poczatkujacy"
  | "trema-na-scenie";

export const blockerArchetypes: Record<
  BlockerId,
  { name: string; summary: string; focus: string }
> = {
  "hamulec-gramatyczny": {
    name: "Gramatyczny hamulcowy",
    summary:
      "Znasz reguły lepiej niż część rodzimych użytkowników języka — i właśnie dlatego zdanie w Twojej głowie czeka na wewnętrzną kontrolę poprawności, zanim wyjdzie na zewnątrz.",
    focus:
      "Pierwszy cykl skupia się na mówieniu pod narzuconym limitem czasu na start odpowiedzi — nie po to, by uczyć nowej gramatyki, tylko żeby przeprogramować odruch sprawdzania jej w locie.",
  },
  "cichy-slownik": {
    name: "Cichy słownik",
    summary:
      "Czytasz i rozumiesz bez trudu, ale w rozmowie słowo, które doskonale znasz, potrafi się schować na dobrych kilka sekund ciszy.",
    focus:
      "Trening idzie w stronę szybkiego przywoływania słów pod presją — parafrazy, mówienia „dookoła” brakującego wyrazu, zamiast czekania, aż sam się przypomni.",
  },
  "mgla-sluchowa": {
    name: "Mgła słuchowa",
    summary:
      "Tekst pisany nie stanowi problemu, ale żywa mowa — połączone wyrazy, różne akcenty, rozmowa bez obrazu — zamienia się w trudny do rozszyfrowania szum.",
    focus:
      "Więcej materiału słuchowego w naturalnym tempie i różnych akcentach, nie tylko podręcznikowej wymowy spikera, plus ćwiczenie wyłapywania sensu bez rozumienia każdego pojedynczego słowa.",
  },
  "wieczny-poczatkujacy": {
    name: "Wieczny początkujący",
    summary:
      "To już kolejne podejście z rzędu — kurs, aplikacja, znowu kurs — i za każdym razem start od nowa, zamiast od miejsca, w którym poprzednio się skończyło.",
    focus:
      "Pierwsza sesja to w połowie rozmowa o tym, co konkretnie przerwało poprzednie podejścia, żeby ten sam mechanizm nie zadziałał po raz kolejny, plus jasny czterotygodniowy horyzont zamiast bezterminowego zobowiązania.",
  },
  "trema-na-scenie": {
    name: "Tremowy performer",
    summary:
      "Słownictwo i gramatyka są w porządku, ale realna rozmowa z obcokrajowcem — zwłaszcza przez telefon — uruchamia coś bliższego tremie niż brakom językowym.",
    focus:
      "Stopniowana ekspozycja: od rozmowy z prowadzącym, przez rozmowę w małej grupie, po sytuację zbliżoną do realnej — z dziennikiem poprawek skupionym bardziej na tym, co się udało, niż na tym, co nie.",
  },
};

export const blockerOrder: BlockerId[] = [
  "hamulec-gramatyczny",
  "cichy-slownik",
  "mgla-sluchowa",
  "wieczny-poczatkujacy",
  "trema-na-scenie",
];

export const blockerStatements: { id: string; label: string; weight: BlockerId[] }[] = [
  {
    id: "s1",
    label: "Zanim coś powiem, najpierw układam to zdanie w głowie gramatycznie poprawnie — i często nie zdążę.",
    weight: ["hamulec-gramatyczny"],
  },
  {
    id: "s2",
    label: "W rozmowie zdarza mi się zamilknąć, bo szukam jednego, konkretnego słowa, które przecież znam.",
    weight: ["cichy-slownik"],
  },
  {
    id: "s3",
    label: "Filmy, artykuły i maile po angielsku rozumiem bez problemu — rozmowa na żywo to zupełnie inna historia.",
    weight: ["mgla-sluchowa"],
  },
  {
    id: "s4",
    label: "Zaczynałem lub zaczynałam naukę angielskiego już co najmniej dwa razy i za każdym razem coś to przerywało.",
    weight: ["wieczny-poczatkujacy"],
  },
  {
    id: "s5",
    label: "Nawet gdy wiem, co powiedzieć, głos albo pewność siebie zawodzą — zwłaszcza z kimś obcym.",
    weight: ["trema-na-scenie"],
  },
  {
    id: "s6",
    label: "Rozmowa telefoniczna po angielsku, bez możliwości czytania z twarzy, jest wyraźnie trudniejsza niż rozmowa na żywo.",
    weight: ["mgla-sluchowa", "trema-na-scenie"],
  },
  {
    id: "s7",
    label: "Zdarza mi się poprawiać samego siebie w połowie zdania, bo usłyszałem błąd, zanim ktokolwiek zdążył zareagować.",
    weight: ["hamulec-gramatyczny"],
  },
  {
    id: "s8",
    label: "Mam wrażenie, że mój zasób słów jest spory, ale w rozmowie sięgam wciąż po te same, najprostsze warianty.",
    weight: ["cichy-slownik"],
  },
  {
    id: "s9",
    label: "Zwykle dobrze wiem, jak zacząć naukę — problem pojawia się w trzecim, czwartym tygodniu.",
    weight: ["wieczny-poczatkujacy"],
  },
  {
    id: "s10",
    label: "Wolę odpisać e-mailem niż zadzwonić, nawet jeśli rozmowa zajęłaby dziesięć razy mniej czasu.",
    weight: ["trema-na-scenie"],
  },
];
