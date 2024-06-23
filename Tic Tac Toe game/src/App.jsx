import "./App.css";
import Player from "../Components/Player";
import GameBoard from "../Components/GameBoard";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player intialname="player 1" symbol="X" />
          <Player intialname="palyer 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
