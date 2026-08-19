const TIME_ZONE = "Europe/Warsaw";

// 5 stycznia 2026 to poniedziałek — realny punkt odniesienia, nie magiczna liczba.
// Kolejne starty grup wypadają co drugi poniedziałek od tej daty.
const ANCHOR_UTC = Date.UTC(2026, 0, 5);
const CYCLE_DAYS = 14;
const DAY_MS = 86_400_000;

const isoDateParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function warsawMidnightUTC(date: Date): number {
  const parts = isoDateParts.formatToParts(date);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return Date.UTC(get("year"), get("month") - 1, get("day"));
}

/** Najbliższa data startu grupy (dzisiaj włącznie), licząc od realnego kalendarza w strefie Europe/Warsaw. */
export function nextCohortStart(reference: Date): Date {
  const today = warsawMidnightUTC(reference);
  const daysSinceAnchor = Math.round((today - ANCHOR_UTC) / DAY_MS);
  const cyclesPassed = Math.max(Math.ceil(daysSinceAnchor / CYCLE_DAYS), 0);
  return new Date(ANCHOR_UTC + cyclesPassed * CYCLE_DAYS * DAY_MS);
}

const longDateFormatter = new Intl.DateTimeFormat("pl-PL", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatCohortStart(date: Date): string {
  return longDateFormatter.format(date);
}
