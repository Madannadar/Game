import { useState } from "react";
import { MatchEngine } from "./game-engine/match";
import { samplePlayers } from "./game-engine/cards";

const engine = new MatchEngine(
  { name: "You", players: Array(11).fill(samplePlayers[0]) },
  { name: "Opponent", players: Array(11).fill(samplePlayers[1]) }
);

function App() {
  const [log, setLog] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  function playBall(ballType: any, shotType: any) {
    const result = engine.nextBall({ ballType, shotType });
    setLog((l) => [
      ...l,
      `${result.ballType} + ${result.shotType} → ${result.description}`,
    ]);
    setScore(engine.getScore());
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Score: {score}</h1>

      <h3>Choose Ball</h3>
      {["yorker","bouncer","good"].map((b) => (
        <button key={b} onClick={() => playBall(b, "balanced")}>
          {b}
        </button>
      ))}

      <h3>Choose Shot</h3>
      {["defensive","balanced","aggressive"].map((s) => (
        <button key={s} onClick={() => playBall("good", s)}>
          {s}
        </button>
      ))}

      <pre>{log.join("\n")}</pre>
    </div>
  );
}
 
export default App;
