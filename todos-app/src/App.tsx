import React from "react";
import TodoInput from "./components/TodoInput.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

function App() {
  const { tasks } = useSelector((state: RootState) => state.todos);
  console.log(tasks);
  return (
    <div className="App">
      <h1>todos</h1>
      <TodoInput />
    </div>
  );
}

export default App;
