import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import TodoItem from "./TodoItem.tsx";

const TodoList: React.FC = () => {
  const { tasks, filter } = useSelector((state: RootState) => state.todos);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div>
      {filteredTasks.map((task) => (
        <TodoItem key={task.id} todo={task} />
      ))}
    </div>
  );
};

export default TodoList;
