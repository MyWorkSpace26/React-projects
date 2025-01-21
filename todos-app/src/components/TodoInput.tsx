import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/todoSlice.ts";
import { TextField, IconButton, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TodoInput: React.FC = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  return (
    <Box
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <TextField
        variant="outlined"
        placeholder="Add a new task"
        fullWidth
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <IconButton color="primary" onClick={handleAddTask}>
        <AddCircleIcon style={{ fontSize: "40px" }} />
      </IconButton>
    </Box>
  );
};

export default TodoInput;
