import { describe, it, expect, beforeEach } from "vitest";
import { useTodoStore } from "../store/useStore";
import { act } from "@testing-library/react";
import { TodoStore } from "../types/StoreTypes";

const getStoreState = (): TodoStore => {
  const state: TodoStore = useTodoStore.getState();
  act(() => {
    // Just for the act() wrapper
  });
  return state;
};

describe("Todo Store", () => {
  beforeEach(() => {
    act(() => {
      const state = useTodoStore.getState();
      state.tasks = [];
    });
  });

  it("should add a new task to the store", () => {
    const initialState = getStoreState();
    expect(initialState.tasks.length).toBe(0);

    act(() => {
      initialState.addTask("Test Todo", "Test Description", "work");
    });

    const newState = getStoreState();
    expect(newState.tasks.length).toBe(1);
    expect(newState.tasks[0].title).toBe("Test Todo");
    expect(newState.tasks[0].description).toBe("Test Description");
    expect(newState.tasks[0].category).toBe("work");
    expect(newState.tasks[0].isCompleted).toBe(false);
  });

  it("should toggle task completion", () => {
    const state = getStoreState();

    act(() => {
      state.addTask("Test Todo", "Test Description", "work");
    });

    // Get the task ID
    const taskId = getStoreState().tasks[0].id;

    // Toggle completion
    act(() => {
      state.toggleTaskCompletion(taskId);
    });

    const newState = getStoreState();
    expect(newState.tasks[0].isCompleted).toBe(true);

    act(() => {
      state.toggleTaskCompletion(taskId);
    });

    const finalState = getStoreState();
    expect(finalState.tasks[0].isCompleted).toBe(false);
  });
});
