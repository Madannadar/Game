import type {
  Team,
  BallDecision,
  BallOutcome,
} from "./types";
import { resolveBall } from "./resolveBall";
import { createRNG } from "./rng";

export class MatchEngine {
  private battingScore = 0;
  private ball = 0;
  private striker = 0;
  private nonStriker = 1;

  private batting: Team;
  private bowling: Team;
  private rng: () => number;

  constructor(batting: Team, bowling: Team, seed = 42) {
    this.batting = batting;
    this.bowling = bowling;
    this.rng = createRNG(seed);
  }

  nextBall(decision: BallDecision): BallOutcome {
    const batsman = this.batting.players[this.striker];
    const bowler = this.bowling.players[this.ball % 6];

    const outcome = resolveBall(
      batsman,
      bowler,
      decision,
      this.rng
    );

    this.ball++;
    this.battingScore += outcome.runs;

    if (outcome.wicket) {
      this.striker++;
    }

    if (outcome.runs % 2 === 1) {
      [this.striker, this.nonStriker] =
        [this.nonStriker, this.striker];
    }

    return outcome;
  }

  isOver(): boolean {
    return this.ball >= 12;
  }

  getScore(): number {
    return this.battingScore;
  }
}
