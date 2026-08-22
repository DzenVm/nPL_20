# xelieran.site

Polskojęzyczny serwis SSR na Next.js 16 (App Router) poświęcony nauce języka
angielskiego online dla dorosłych w Polsce, z naciskiem na osoby, które już
wcześniej próbowały się uczyć i utknęły. Strona główna jest maksymalnie
nasycona własną treścią (diagnoza bariery mówienia, metoda, czterotygodniowy
cykl nauki, punkty tarcia językowego PL→EN, organizacja zajęć, standard
prowadzących, ścieżka dla firm i zespołów, FAQ), a `/jak-uczymy`, `/dla-firm`
i `/kontakt` rozwijają wybrane wątki na osobnych podstronach.

## Stos technologiczny i czym się wyróżnia

- **Next.js 16** (App Router) + React 19 + TypeScript, z włączonym
  **Cache Components** (`cacheComponents: true`) — cała strona, łącznie z
  widżetem „najbliższy start grupy” i rokiem w stopce, jest w pełni
  wyrenderowana i cache’owana (`"use cache"`) zamiast dociągana strumieniowo
  po pierwszym payloadzie. Każdy odbiorca, bot czy przeglądarka, dostaje
  od razu ten sam, gotowy HTML — bez stanu pośredniego czy placeholdera,
  który mógłby zostać przechwycony zamiast właściwej treści. Data startu
  liczona jest od realnej daty serwera w strefie `Europe/Warsaw` (cykle
  startują co drugi poniedziałek, licząc od stałego punktu odniesienia) i
  odświeżana przy każdej rewalidacji cache’a.
- **Czysty, nowoczesny CSS — bez Tailwinda i bez CSS Modules.** Jeden plik
  `globals.css` zorganizowany przez natywne warstwy `@layer`
  (`reset, tokens, base, layout, components, utilities`) i natywny CSS
  nesting. Własna paleta (chłodny jasny neutral + fiolet/śliwka/mięta) i
  para krojów Source Serif 4 / Work Sans / IBM Plex Mono zarejestrowane jako
  zmienne CSS.
- **Google Consent Mode v2 zaimplementowany właściwie**, nie tylko
  „nie montuj skryptu bez zgody”: `src/components/ConsentDefaults.tsx`
  ustawia domyślnie odmówione sygnały zgody (`ad_storage`, `ad_user_data`,
  `ad_personalization`, `analytics_storage`) skryptem `beforeInteractive`,
  zanim cokolwiek się załaduje; `GoogleTag.tsx` ładuje `gtag.js` zawsze (gdy
  skonfigurowany jest identyfikator), a `CookieConsent.tsx` aktualizuje
  zgodę przez `gtag('consent','update', …)` dopiero po realnym wyborze
  odwiedzającego. Zgodę można w każdej chwili zmienić przyciskiem „Zarządzaj
  zgodą na cookies” w stopce.
- **Diagnoza bariery mówienia** (`/#diagnoza`) — samodzielny komponent
  kliencki bez zewnętrznych bibliotek formularzy: dziesięć zdań do
  zaznaczenia, prosta, w pełni deterministyczna funkcja punktująca
  (`src/lib/blockerQuiz.ts`) wskazuje jeden z pięciu archetypów bariery.
- **6 rastrowych obrazów PNG wygenerowanych proceduralnie** —
  `scripts/generate-images.mjs` buduje sceny z kodu (PRNG `mulberry32`,
  wygładzane krzywe „nici” z losowego błądzenia, siatka kropek, drobne
  znaki adnotacyjne) i renderuje je do PNG przez headless Chromium
  (Playwright) — zero zdjęć stockowych, zero zewnętrznego API do obrazów.
  Tym samym mechanizmem powstają: favicon (`src/app/icon.png`, 32×32),
  ikona iOS (`src/app/apple-icon.png`, 180×180), obraz udostępniania
  (`src/app/opengraph-image.png`, 1200×630) i dwie ikony aplikacji webowej
  (192/512 px) — wszystkie jako jeden, spójny, abstrakcyjny znak (nie
  litery, nie logotyp).
- **Zero brandingu.** Serwis nie ma nazwy własnej, nazwy handlowej ani
  logotypu — w nagłówku celowo nie ma żadnego elementu w miejscu, gdzie
  zwykle stoi logo, tylko nawigacja i wezwanie do działania.
- **Zero JS tam, gdzie się da.** Menu mobilne w nagłówku oraz lista „punktów
  tarcia” językowego działają na natywnych `<details>/<summary>`, bez ani
  jednej linijki JavaScriptu — jedyne komponenty klienckie to baner zgody na
  cookies, przycisk kopiowania adresu e-mail i test diagnozy bariery.

## Komendy

```bash
npm install
npm run dev          # lokalny serwer deweloperski, http://localhost:3000
npm run build         # produkcyjny build
npm run start           # uruchomienie builda lokalnie
npm run lint              # ESLint (flat config, eslint-config-next)
npm run typecheck          # tsc --noEmit
npm run gen:images          # regeneracja obrazów w public/ i src/app/
```

Wymagania: Node.js ≥ 20.9. `npm run gen:images` wymaga Playwrighta z dostępem
do przeglądarki Chromium (w tym środowisku skonfigurowany przez
`PLAYWRIGHT_BROWSERS_PATH`; lokalnie użyj `npx playwright install chromium` i
w razie potrzeby usuń jawny `executablePath` w skrypcie).

## Struktura

```
src/app/                  trasy App Router: /, /jak-uczymy, /dla-firm, /kontakt,
                           strony prawne, sitemap/robots/manifest/ikony/OG
src/components/            nagłówek, stopka, baner cookies, znacznik Google,
                            widżet startu grupy, test diagnozy bariery,
                            akordeon punktów tarcia, przycisk kopiowania e-maila
src/content/                 typizowana treść (segmenty odbiorców, metoda, cykl,
                              punkty tarcia, FAQ, archetypy bariery…)
src/lib/                       zgoda na cookies, obliczanie startu grupy, punktacja quizu
public/images/, public/icons/    obrazy wygenerowane proceduralnie
scripts/generate-images.mjs      generator obrazów (Playwright + SVG)
```

## Deploy na Vercel

1. Zaimportuj to repozytorium/gałąź jako nowy projekt na
   [vercel.com](https://vercel.com) — framework Next.js zostanie wykryty
   automatycznie (`vercel.json` ustawia jedynie region `fra1`, najbliższy
   Polsce).
2. Zmienne środowiskowe nie są wymagane do działania serwisu. Opcjonalnie
   ustaw `NEXT_PUBLIC_GOOGLE_ADS_ID` (patrz `.env.example`) — znacznik
   Google Ads zacznie wtedy działać w trybie zgodnym z Consent Mode (patrz
   wyżej).
3. Po pierwszym deployu: **Project → Settings → Domains → Add** → wpisz
   `xelieran.site` (opcjonalnie też `www.xelieran.site`).
4. U rejestratora domeny ustaw rekordy DNS wskazane przez Vercel w trakcie
   dodawania domeny — warto kierować się dokładnie tym, co pokaże panel
   Vercel w danym momencie, bo te wartości bywają aktualizowane.
5. Certyfikat SSL wystawia się automatycznie po potwierdzeniu DNS, zwykle w
   ciągu kilku minut.

## Google Ads / RODO — co już uwzględniono

- Google Consent Mode v2 (patrz wyżej) — wymagany dla reklam kierowanych do
  użytkowników w EOG, do którego należy Polska.
- Baner zgody na cookies (niezbędne / reklamowe), bez dark patterns, bez
  blokowania treści przy odmowie, z możliwością zmiany wyboru w dowolnym
  momencie — `src/components/CookieConsent.tsx`.
- `/polityka-prywatnosci`, `/regulamin`, `/polityka-cookies`, `/kontakt` —
  treściwe strony napisane pod ten konkretny serwis, w tym jawne prawo
  odstąpienia od umowy w terminie 14 dni i tryb reklamacji.
- Brak fałszywych opinii, ocen czy liczników uczniów; brak fałszywego
  odliczania promocji — widżet startu grupy pokazuje realną, wyliczoną datę
  najbliższego cyklu, nie malejącą pulę „ostatnich miejsc”.
- Serwis celowo nie pokazuje żadnych kwot ani warunków płatności — te
  ustala się indywidualnie w rozmowie wstępnej, więc na stronie nie ma czego
  przedstawiać w mylący sposób.
- Sekcja „Trzy pytania, które warto zadać na głos” oraz opis standardu
  prowadzących wprost adresują to, czego serwis nie obiecuje (np. płynności
  „w 30 dni”) i jak faktycznie weryfikowani są prowadzący.
