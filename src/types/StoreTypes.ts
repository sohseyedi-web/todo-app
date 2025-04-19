export type Task = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: "personal" | "work" | "college";
};

export type TodoStore = {
  tasks: Task[];
  addTask: (
    title: string,
    description?: string,
    category?: "personal" | "work" | "college"
  ) => void;
  editTask: (
    id: string,
    updatedTitle: string,
    updatedDescription?: string,
    updatedCategory?: "personal" | "work" | "college"
  ) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  categoryFilter: "all" | "personal" | "work" | "college";
  setCategoryFilter: (
    category: "all" | "personal" | "work" | "college"
  ) => void;
  sort: "asc" | "desc";
  setSort: (sort: "asc" | "desc") => void;
};
