import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../types/Todo";

const initialState = {
  tasks: [] as Todo[],
  filter: "all" as "all" | "active" | "completed",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: uuidv4(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const todo = state.tasks.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((t) => !t.completed);
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, removeTask, clearCompleted, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
