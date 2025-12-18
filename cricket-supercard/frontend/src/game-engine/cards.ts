// src/cards.ts
import type { PlayerCard } from "./types";

export const samplePlayers: PlayerCard[] = [
  {
    id: "p1",
    name: "Aggressive Opener",
    batting: {
      yorker: 2,
      bouncer: 4,
      full: 5,
      good: 4,
      slower: 3,
    },
    bowling: {
      yorker: 3,
      bouncer: 2,
      full: 1,
      good: 2,
      slower: 1,
    },
  },
  {
    id: "p2",
    name: "Fast Bowler",
    batting: {
      yorker: 1,
      bouncer: 2,
      full: 2,
      good: 2,
      slower: 1,
    },
    bowling: {
      yorker: 5,
      bouncer: 4,
      full: 3,
      good: 4,
      slower: 3,
    },
  },
];
