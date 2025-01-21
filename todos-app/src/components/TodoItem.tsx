import React from "react";
import { IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TodoItem = ({ id, text, completed, onToggle, onDelete }: any) => {
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        margin: "10px 0",
        backgroundColor: completed ? "#d4f8d4" : "#fff",
      }}
    >
      <Box>
        <Typography
          variant="body1"
          style={{
            textDecoration: completed ? "line-through" : "none",
            fontStyle: "italic",
          }}
        >
          {text}
        </Typography>
      </Box>
      <Box>
        <IconButton color="primary" onClick={() => onToggle(id)}>
          <CheckCircleIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TodoItem;
