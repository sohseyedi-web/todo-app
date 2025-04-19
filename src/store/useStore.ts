import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TodoStore } from "../types/StoreTypes";

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      tasks: [],
      sort: "asc", //'asc' | 'desc'
      addTask: (title, description, category = "personal") =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now().toString(),
              title,
              description,
              isCompleted: false,
              category,
            },
          ],
        })),
      editTask: (id, updatedTitle, updatedDescription, updatedCategory) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  title: updatedTitle,
                  description: updatedDescription,
                  category: updatedCategory || task.category,
                }
              : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskCompletion: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        })),
      filter: "all",
      setFilter: (filter) => set({ filter }),
      categoryFilter: "all",
      setCategoryFilter: (category) => set({ categoryFilter: category }),

      setSort: () =>
        set((state) => {
          const sortedTasks = [...state.tasks].sort((a, b) => {
            return state.sort === "asc"
              ? Number(a.id) - Number(b.id)
              : Number(b.id) - Number(a.id);
          });
          return {
            tasks: sortedTasks,
            sort: state.sort === "asc" ? "desc" : "asc",
          };
        }),
    }),
    {
      name: "todo-storage", // unique name for localStorage key
    }
  )
);
