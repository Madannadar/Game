// src/resolveBall.ts
import type { BallType, PlayerCard, BallResult } from "./types";

export function resolveBall(
  batsman: PlayerCard,
  bowler: PlayerCard,
  ball: BallType,
  rng: () => number
): BallResult {
  const bat = batsman.batting[ball];
  const bowl = bowler.bowling[ball];

  const diff = bat - bowl;
  const luck = rng();

  if (diff <= -2 && luck < 0.4) {
    return { runs: 0, wicket: true, description: "Wicket!" };
  }

  if (diff === -1) {
    return { runs: 0, wicket: false, description: "Dot ball" };
  }

  if (diff === 0) {
    return { runs: luck > 0.5 ? 2 : 1, wicket: false, description: "Singles" };
  }

  if (diff === 1) {
    return { runs: 4, wicket: false, description: "FOUR!" };
  }

  return { runs: 6, wicket: false, description: "SIX!" };
}
