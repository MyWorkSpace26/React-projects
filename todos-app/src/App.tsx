import React from "react";
import TodoInput from "./components/TodoInput.tsx";
import TodoList from "./components/TodoList.tsx";
import Filters from "./components/Filters.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

function App() {
  const { tasks } = useSelector((state: RootState) => state.todos);
  console.log(tasks);
  return (
    <div className="App">
      <h1>todos</h1>
      <TodoInput />
      <TodoList />
      <Filters />
    </div>
  );
}

export default App;
