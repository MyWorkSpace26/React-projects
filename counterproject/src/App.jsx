import { useState } from "react";
import Header from "./components/Header";
import { log } from "./log.js";
import Counter from "./components/Counter/Counter.jsx";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
