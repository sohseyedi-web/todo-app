import { useState } from "react";
import TaskForm from "./components/tasks/TaskForm";
import Modal from "./components/common/ModalWrapper";
import TodosContainer from "./components/TodosContainer";
import { useTodoStore } from "./store/useStore";

const App = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {tasks?.length ? (
        <TodosContainer />
      ) : (
        <section className="flex items-center justify-center h-screen flex-col">
          <p className="text-zinc-200 text-xl font-semibold">
            No tasks yet. Add your first task!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-zinc-800 text-lg hover:bg-zinc-700 transition-all duration-300 animate-bounce text-white w-[250px] h-[45px] rounded-xl mt-7"
          >
            Add New Task
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <TaskForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        </section>
      )}
    </>
  );
};

export default App;
