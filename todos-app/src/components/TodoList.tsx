import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store.ts";
import TodoItem from "./TodoItem.tsx";
import EmptyMessage from "../ui/EmptyMessage.tsx";
import styles from "./TodoList.module.css"; // Импортируем стили

const ITEMS_PER_PAGE = 5;

const TodoList: React.FC = () => {
  const { tasks, filter } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // Сброс текущей страницы на первую при изменении фильтра
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  let emptyMessage = "";
  if (filter === "all" && filteredTasks.length === 0) {
    emptyMessage = "There are no tasks yet, please add them.";
  } else if (filter === "active" && filteredTasks.length === 0) {
    emptyMessage = "There are no active tasks yet, please add tasks.";
  } else if (filter === "completed" && filteredTasks.length === 0) {
    emptyMessage = "There are no completed tasks yet, please add tasks.";
  }

  return (
    <div className={styles.taskListContainer}>
      {emptyMessage ? (
        <EmptyMessage message={emptyMessage} />
      ) : (
        <>
          {currentTasks.map((task) => (
            <TodoItem
              key={task.id}
              id={task.id}
              text={task.text}
              completed={task.completed}
              onToggle={(id) =>
                dispatch({ type: "todos/toggleTask", payload: id })
              }
              onDelete={(id) =>
                dispatch({ type: "todos/removeTask", payload: id })
              }
            />
          ))}

          {/* Пагинация */}
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${styles.pageButton} ${
                  currentPage === index + 1 ? styles.active : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
