import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearCompleted } from "../store/todoSlice.ts";
import { RootState } from "../store/store.ts";
import { Box, Button, ButtonGroup } from "@mui/material";

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.todos.filter);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop="20px"
    >
      <ButtonGroup variant="contained" size="small">
        <Button
          onClick={() => dispatch(setFilter("all"))}
          color={filter === "all" ? "primary" : "inherit"}
        >
          All
        </Button>
        <Button
          onClick={() => dispatch(setFilter("active"))}
          color={filter === "active" ? "primary" : "inherit"}
        >
          Active
        </Button>
        <Button
          onClick={() => dispatch(setFilter("completed"))}
          color={filter === "completed" ? "primary" : "inherit"}
        >
          Completed
        </Button>
      </ButtonGroup>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear Completed
      </Button>
    </Box>
  );
};

export default Filters;
