import React from "react";
import { Box, Typography } from "@mui/material";
import TodoInput from "./components/TodoInput.tsx";
import TodoList from "./components/TodoList.tsx";
import Filters from "./components/Filters.tsx";

function App() {
  return (
    <Box style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todos
      </Typography>
      <TodoInput />
      <Filters />
      <TodoList />
    </Box>
  );
}

export default App;
