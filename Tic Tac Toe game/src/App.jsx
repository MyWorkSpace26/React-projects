import "./App.css";
import Player from "../Components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player intialname="player 1" symbol="X" />
          <Player intialname="palyer 2" symbol="O" />
        </ol>
      </div>
    </main>
  );
}

export default App;
