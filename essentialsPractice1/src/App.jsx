import { useState } from "react";
import "./App.css";

import logo from "../public/investment-calculator-logo.png";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header id="header">
        <img src={logo} alt="Logo showing a money bag" />
        <h1>Investment Calculator</h1>
      </header>
      <section id="user-input">
        <div className="input-group">
          <p>
            <label htmlFor="initial-investment">Initial Investment</label>
            <input type="number" required />
          </p>
          <p>
            <label htmlFor="Annual Investmen">Annual Investment</label>
            <input type="number" required />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="Expected Return">Expected Return</label>
            <input type="number" required />
          </p>
          <p>
            <label htmlFor="Duration">Duration</label>
            <input type="number" required />
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
