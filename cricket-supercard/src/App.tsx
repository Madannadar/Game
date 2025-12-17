import { runDemoMatch } from "./game-engine";

function App() {
  const result = runDemoMatch();

  return (
    <div style={{ padding: 20 }}>
      <h1>2-Over Match Simulation</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {result.log.join("\n")}
      </pre>
      <h2>
        Final Score: {result.teamA} - {result.teamB}
      </h2>
    </div>
  );
}

export default App;
