import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/tasks/TaskForm";
import * as storeModule from "../store/useStore";
import "@testing-library/jest-dom";

// Mock the store functions
vi.mock("../store/useStore", () => ({
  useTodoStore: vi.fn(() => ({
    addTask: vi.fn(),
    editTask: vi.fn(),
  })),
}));

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock react-hook-form to bypass validation and return valid states
vi.mock("react-hook-form", () => {
  return {
    useForm: () => ({
      register: () => ({}),
      handleSubmit: (fn: (data: any) => void) => (e: { preventDefault: () => void }) => {
        e.preventDefault();
        fn({
          title: "Test Todo",
          description: "Test Description",
          category: "work",
        });
      },
      formState: {
        errors: {},
        isValid: true,
        isDirty: true,
      },
    }),
  };
});

describe("TaskForm", () => {
  // Setup spies and mocks
  const addTaskMock = vi.fn();
  const editTaskMock = vi.fn();
  const onCloseMock = vi.fn();

  // Before test setup
  beforeEach(() => {
    vi.clearAllMocks();

    // Override the default mock to use our test-specific mocks
    vi.mocked(storeModule.useTodoStore).mockReturnValue({
      addTask: addTaskMock,
      editTask: editTaskMock,
      // Add other required store properties as needed
      tasks: [],
      filter: "all",
      setFilter: vi.fn(),
      categoryFilter: "all",
      setCategoryFilter: vi.fn(),
      sort: "asc",
      setSort: vi.fn(),
      deleteTask: vi.fn(),
      toggleTaskCompletion: vi.fn(),
    });
  });

  it("should call addTask when submitting the form", () => {
    // Render the component
    render(<TaskForm onClose={onCloseMock} />);

    // Get the submit button and click it
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Verify the correct functions were called
    expect(addTaskMock).toHaveBeenCalledTimes(1);
    expect(addTaskMock).toHaveBeenCalledWith(
      "Test Todo",
      "Test Description",
      "work"
    );
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
