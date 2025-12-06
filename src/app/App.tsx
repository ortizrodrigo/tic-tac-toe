import "./App.css";
import { Variants, Game, Stats, SplitView } from "../components";

function App() {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <SplitView template="1fr 2fr 1fr">
        <Variants />
        <Game />
        <Stats />
      </SplitView>
    </div>
  );
}

export default App;
