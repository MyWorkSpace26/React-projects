import { useState } from "react";
import "./App.css";
import Player from "../Components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="player 1" symbol="X" />
          <Player name="palyer 2" symbol="O" />
        </ol>
      </div>
    </main>
  );
}

export default App;
