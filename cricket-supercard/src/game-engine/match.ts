// src/match.ts
import type { Team, MatchResult, BallType } from "./types";
import { createRNG } from "./rng";
import { resolveBall } from "./resolveBall";

const BALLS: BallType[] = ["yorker", "bouncer", "full", "good", "slower"];

function playInnings(
  batting: Team,
  bowling: Team,
  rng: () => number
) {
  let score = 0;
  let wickets = 0;
  let strikerIndex = 0;
  let bowlerIndex = 0;
  const log: string[] = [];

  for (let ball = 1; ball <= 12; ball++) {
    if (wickets >= batting.players.length - 1) break;

    const batsman = batting.players[strikerIndex];
    const bowler = bowling.players[bowlerIndex];

    const ballType = BALLS[Math.floor(rng() * BALLS.length)];

    const result = resolveBall(batsman, bowler, ballType, rng);

    score += result.runs;

    log.push(
      `Ball ${ball}: ${batsman.name} vs ${bowler.name} (${ballType}) → ${result.description}`
    );

    if (result.wicket) {
      wickets++;
      strikerIndex++;
    }

    bowlerIndex = (bowlerIndex + 1) % bowling.players.length;
  }

  return { score, log };
}

export function playMatch(teamA: Team, teamB: Team, seed = 1): MatchResult {
  const rng = createRNG(seed);

  const inns1 = playInnings(teamA, teamB, rng);
  const inns2 = playInnings(teamB, teamA, rng);

  return {
    teamA: inns1.score,
    teamB: inns2.score,
    log: [...inns1.log, "---", ...inns2.log],
  };
}
