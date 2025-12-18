import type {
  PlayerCard,
  BallDecision,
  BallOutcome,
} from "./types";

export function resolveBall(
  batsman: PlayerCard,
  bowler: PlayerCard,
  decision: BallDecision,
  rng: () => number
): BallOutcome {
  const bat = batsman.batting[decision.ballType];
  const bowl = bowler.bowling[decision.ballType];

  let diff = bat - bowl;

  if (decision.shotType === "aggressive") diff += 1;
  if (decision.shotType === "defensive") diff -= 1;

  const luck = rng();

  if (diff <= -2 && luck < 0.4) {
    return {
      runs: 0,
      wicket: true,
      ballType: decision.ballType,
      shotType: decision.shotType,
      description: "Wicket!",
    };
  }

  if (diff <= -1) {
    return {
      runs: 0,
      wicket: false,
      ballType: decision.ballType,
      shotType: decision.shotType,
      description: "Dot ball",
    };
  }

  if (diff === 0) {
    return {
      runs: luck > 0.5 ? 2 : 1,
      wicket: false,
      ballType: decision.ballType,
      shotType: decision.shotType,
      description: "Singles",
    };
  }

  if (diff === 1) {
    return {
      runs: 4,
      wicket: false,
      ballType: decision.ballType,
      shotType: decision.shotType,
      description: "FOUR!",
    };
  }

  return {
    runs: 6,
    wicket: false,
    ballType: decision.ballType,
    shotType: decision.shotType,
    description: "SIX!",
  };
}
