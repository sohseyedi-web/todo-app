import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/tasks/TaskForm';
import { useTodoStore } from '../store/useStore';
import '@testing-library/jest-dom';

// Mock Zustand store
vi.mock('../store/useStore', () => ({
  useTodoStore: vi.fn()
}));

describe('TaskForm Component', () => {
  const mockAddTask = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup the mock implementation of useTodoStore
    (useTodoStore as any).mockImplementation(() => ({
      addTask: mockAddTask
    }));
  });

  it('should add a todo when form is submitted', () => {
    // Render the component
    render(<TaskForm onClose={mockOnClose} />);

    // Get form elements
    const titleInput = screen.getByPlaceholderText('Title ...');
    const descriptionInput = screen.getByPlaceholderText('Optional description');
    const categorySelect = screen.getByRole('combobox');
    const submitButton = screen.getByText('Submit');

    // Fill the form
    fireEvent.change(titleInput, { target: { value: 'Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test description' } });
    fireEvent.change(categorySelect, { target: { value: 'work' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Assertions
    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith('Test Todo', 'This is a test description', 'work');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not add a todo when title is empty', () => {
    // Render the component
    render(<TaskForm onClose={mockOnClose} />);

    // Get form elements
    const titleInput = screen.getByPlaceholderText('Title ...');
    const descriptionInput = screen.getByPlaceholderText('Optional description');
    const submitButton = screen.getByText('Submit');

    // Fill the form with empty title
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: 'This is a test description' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Assertions
    expect(mockAddTask).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
