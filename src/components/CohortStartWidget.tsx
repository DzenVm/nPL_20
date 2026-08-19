import { connection } from "next/server";
import { formatCohortStart, nextCohortStart } from "@/lib/cohortStart";

export async function CohortStartWidget() {
  await connection();
  const date = nextCohortStart(new Date());

  return (
    <div className="cohort-widget">
      <span className="cohort-widget__dot" aria-hidden />
      <span>
        <span className="cohort-widget__label">Najbliższy start grupy</span>
        <br />
        <span className="cohort-widget__value">{formatCohortStart(date)}</span>
      </span>
    </div>
  );
}

export function CohortStartWidgetFallback() {
  return (
    <div className="cohort-widget">
      <span className="cohort-widget__dot" aria-hidden />
      <span>
        <span className="cohort-widget__label">Najbliższy start grupy</span>
        <br />
        <span className="cohort-widget__value">sprawdzanie terminu…</span>
      </span>
    </div>
  );
}
