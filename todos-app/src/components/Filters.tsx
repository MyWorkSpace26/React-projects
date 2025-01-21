import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearCompleted } from "../store/todoSlice.ts";
import { RootState } from "../store/store.ts";

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.todos.filter);

  return (
    <div>
      <button
        onClick={() => dispatch(setFilter("all"))}
        disabled={filter === "all"}
      >
        All
      </button>
      <button
        onClick={() => dispatch(setFilter("active"))}
        disabled={filter === "active"}
      >
        Active
      </button>
      <button
        onClick={() => dispatch(setFilter("completed"))}
        disabled={filter === "completed"}
      >
        Completed
      </button>
      <button onClick={() => dispatch(clearCompleted())}>
        Clear Completed
      </button>
    </div>
  );
};

export default Filters;
