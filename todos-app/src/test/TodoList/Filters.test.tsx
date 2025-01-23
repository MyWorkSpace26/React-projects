import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import Filters from "../../components/Filters";
import { RootState } from "../../store/store";
import { setFilter, clearCompleted } from "../../store/todoSlice";

const mockStore = configureStore<RootState>([]);

describe("Filters component", () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      todos: {
        filter: "all",
        tasks: [],
      },
    });
    store.dispatch = jest.fn(); // Мокируем dispatch
  });

  it("dispatches setFilter with 'all' when All button is clicked", () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    fireEvent.click(screen.getByText("All"));
    expect(store.dispatch).toHaveBeenCalledWith(setFilter("all"));
  });

  it("dispatches setFilter with 'active' when Active button is clicked", () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    fireEvent.click(screen.getByText("Active"));
    expect(store.dispatch).toHaveBeenCalledWith(setFilter("active"));
  });

  it("dispatches setFilter with 'completed' when Completed button is clicked", () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    fireEvent.click(screen.getByText("Completed"));
    expect(store.dispatch).toHaveBeenCalledWith(setFilter("completed"));
  });

  it("dispatches clearCompleted when Clear Completed button is clicked", () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    fireEvent.click(screen.getByText("Clear Completed"));
    expect(store.dispatch).toHaveBeenCalledWith(clearCompleted());
  });
});
