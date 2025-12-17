// src/types.ts

export type BallType =
  | "yorker"
  | "bouncer"
  | "full"
  | "good"
  | "slower";

export interface PlayerCard {
  id: string;
  name: string;
  batting: Record<BallType, number>; // 1–5
  bowling: Record<BallType, number>; // 1–5
}

export interface BallResult {
  runs: number;
  wicket: boolean;
  description: string;
}

export interface Team {
  name: string;
  players: PlayerCard[];
}

export interface MatchResult {
  teamA: number;
  teamB: number;
  log: string[];
}
