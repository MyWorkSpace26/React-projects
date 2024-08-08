import { useState, useReducer } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

const setCounter = (state, action) => {
  if (action.type === INCREMENT) {
    return { isCounter: state.isCounter + 1 };
  } else if (action.type === DECREMENT) {
    return { isCounter: state.isCounter - 1 };
  }
  return state;
};

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export default function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = isPrime(initialCount);

  const [state, dispatch] = useReducer(setCounter, { isCounter: initialCount });

  function handleDecrement() {
    dispatch({ type: DECREMENT });
  }

  function handleIncrement() {
    dispatch({ type: INCREMENT });
  }

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={state.isCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
}
