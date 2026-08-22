import { formatCohortStart, nextCohortStart } from "@/lib/cohortStart";

export async function CohortStartWidget() {
  "use cache";
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
