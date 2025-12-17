// src/game-engine/index.ts
import { playMatch } from "./match";
import { samplePlayers } from "./cards";

export function runDemoMatch() {
  const teamA = {
    name: "Team A",
    players: Array(11).fill(samplePlayers[0]),
  };

  const teamB = {
    name: "Team B",
    players: Array(11).fill(samplePlayers[1]),  
  };

  return playMatch(teamA, teamB, 42);
}
