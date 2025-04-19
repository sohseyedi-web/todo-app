import Todo from "./Todo";
import { useTodoStore } from "../../store/useStore";

const TaskList = () => {
  const { filter, tasks, categoryFilter } = useTodoStore();

  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    const statusMatch =
      filter === "all"
        ? true
        : filter === "active"
          ? !task.isCompleted
          : task.isCompleted;

    // Filter by category
    const categoryMatch =
      categoryFilter === "all"
        ? true
        : task.category === categoryFilter;

    // Both filters must match
    return statusMatch && categoryMatch;
  });

  return (
    <div className="space-y-4 lg:p-0 p-3">
      {filteredTasks.length === 0 ? (
        <p className="text-center text-zinc-300 text-lg mt-5">No tasks available</p>
      ) : (
        filteredTasks.map((task) => <Todo key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
