import { frictionPoints } from "@/content/frictionPoints";

export function FrictionAccordion() {
  return (
    <div className="accordion">
      {frictionPoints.map((point) => (
        <details key={point.tag} className="accordion__item">
          <summary>
            <span className="accordion__summary-main">
              <span className="tag tag--plum">{point.tag}</span>
              <span>{point.title}</span>
            </span>
            <span className="accordion__mark" aria-hidden>
              +
            </span>
          </summary>
          <div className="accordion__body">
            <p>{point.body}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
