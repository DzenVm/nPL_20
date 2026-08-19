"use client";

import { useId, useState } from "react";
import { blockerArchetypes, blockerStatements } from "@/content/blockers";
import { scoreBlockers } from "@/lib/blockerQuiz";

export function BlockerQuiz() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const headingId = useId();

  function toggle(id: string) {
    setSubmitted(false);
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  const archetypeId = submitted ? scoreBlockers(selected) : null;
  const archetype = archetypeId ? blockerArchetypes[archetypeId] : null;

  return (
    <div>
      <p id={headingId} className="sr-only">
        Zdania, które warto zaznaczyć, jeśli brzmią jak Ty
      </p>
      <div className="quiz__grid" role="group" aria-labelledby={headingId}>
        {blockerStatements.map((statement) => (
          <label key={statement.id} className="field-check">
            <input
              type="checkbox"
              checked={selected.includes(statement.id)}
              onChange={() => toggle(statement.id)}
            />
            <span>{statement.label}</span>
          </label>
        ))}
      </div>

      <div className="quiz__foot">
        <p className="quiz__hint">Zaznacz tyle, ile faktycznie pasuje — nie trzeba wszystkich dziesięciu.</p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setSubmitted(true)}
          disabled={selected.length === 0}
        >
          Pokaż dominującą barierę
        </button>
      </div>

      {archetype && (
        <div className="quiz__result" aria-live="polite">
          <p className="quiz__result-name">{archetype.name}</p>
          <p>{archetype.summary}</p>
          <p>{archetype.focus}</p>
        </div>
      )}
    </div>
  );
}
