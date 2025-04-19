import { useState } from "react";
import FilterRow from "./FilterRow";
import Modal from "./common/ModalWrapper";
import TaskList from "./tasks/TaskLists";
import IconButton from "./common/IconButton";
import { BiSort } from "react-icons/bi";
import { useTodoStore } from "../store/useStore";
import TaskForm from "./tasks/TaskForm";

const TodosContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { tasks, setSort, sort } = useTodoStore();

  const toggleSort = () => {
    const newSort = sort === "asc" ? "desc" : "asc";
    setSort(newSort);
  };

  return (
    <div className="max-w-5xl mx-auto py-3">
      <h1 className="text-4xl text-center mb-6 text-zinc-200">Todo App</h1>
      <div className="bg-[#181818] border border-zinc-800 lg:rounded-xl  rounded-none w-full p-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-3">
          <div className="md:flex-1">
            <FilterRow />
          </div>
          <div className="flex items-center gap-x-2 mt-3 md:mt-0">
            {tasks?.length > 1 && (
              <IconButton
                className="bg-[#101010] hover:bg-[#202020] text-white"
                icon={<BiSort size={27} />}
                onClick={toggleSort}
              />
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#252525] text-white py-2 px-4 rounded-xl lg:w-40 w-full"
            >
              <span>Add New Task</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <TaskList />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TodosContainer;
