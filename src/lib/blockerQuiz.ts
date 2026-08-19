import { blockerOrder, blockerStatements, type BlockerId } from "@/content/blockers";

/** Zwraca dominujący archetyp bariery na podstawie zaznaczonych zdań, albo null, gdy nic nie wybrano. */
export function scoreBlockers(selectedIds: readonly string[]): BlockerId | null {
  if (selectedIds.length === 0) return null;

  const tally = new Map<BlockerId, number>();
  for (const id of selectedIds) {
    const statement = blockerStatements.find((item) => item.id === id);
    if (!statement) continue;
    for (const blockerId of statement.weight) {
      tally.set(blockerId, (tally.get(blockerId) ?? 0) + 1);
    }
  }

  let best: BlockerId | null = null;
  let bestScore = 0;
  for (const id of blockerOrder) {
    const score = tally.get(id) ?? 0;
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }
  return best;
}
