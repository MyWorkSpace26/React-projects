import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask, removeTask } from "../store/todoSlice.ts";
import { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTask(todo.id))}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      <button onClick={() => dispatch(removeTask(todo.id))}>Delete</button>
    </div>
  );
};

export default TodoItem;
