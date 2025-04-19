import { GrUndo, GrFormCheckmark, GrTrash, GrEdit } from "react-icons/gr";
import { motion } from "framer-motion";
import { useState } from "react";
import { RiArrowRightSLine, RiCloseFill } from "react-icons/ri";
import { useTodoStore } from "../../store/useStore";
import { Task } from "../../types/StoreTypes";
import Modal from "../common/ModalWrapper";
import TaskForm from "./TaskForm";
import IconButton from "../common/IconButton";
import toast from "react-hot-toast";
import truncateText from "../../utils/truncateText";

const Todo = ({ task }: { task: Task }) => {
  const { toggleTaskCompletion, deleteTask } = useTodoStore();
  const [show, setShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const onToggleOpen = () => setShow((prev) => !prev);

  const onCompleted = () => {
    toggleTaskCompletion(task.id);
    toast.success("Change Task Completed");
  };

  const onDelete = () => {
    deleteTask(task.id);
    toast.error("Task Deleted");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "personal":
        return "border-blue-600";
      case "work":
        return "border-red-600";
      case "college":
        return "border-green-600";
      default:
        return "border-gray-600";
    }
  };

  return (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className={`relative p-4 bg-[#212121] border border-zinc-700 text-white transition-opacity duration-300 rounded-xl ${
        show ? "pr-28" : ""
      }`}
    >
      <div className="flex items-center cursor-pointer">
        <div
          className={`text-zinc-100 flex-1 ${
            show || task.isCompleted ? "opacity-50" : ""
          }`}
          onClick={() => setShowDetailsModal(true)}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`text-lg sm:text-xl ${
                task.isCompleted
                  ? "line-through text-zinc-500"
                  : "text-zinc-100"
              }`}
            >
              {truncateText(task.title, 10)}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-xl border-2 ${getCategoryColor(
                task.category
              )}`}
            >
              {task.category}
            </span>
          </div>
          <span className="text-gray-500 text-sm">
            {task.description
              ? truncateText(task.description, 15)
              : "no description"}
          </span>
        </div>
        <div className="flex items-center gap-x-3">
          <IconButton
            className={
              task.isCompleted
                ? "bg-slate-900 hover:bg-slate-800"
                : "bg-emerald-600 hover:bg-emerald-500"
            }
            onClick={onCompleted}
            icon={
              task.isCompleted ? (
                <GrUndo size={27} />
              ) : (
                <GrFormCheckmark size={29} />
              )
            }
          />

          <IconButton
            aria-label="toggle"
            onClick={onToggleOpen}
            className="bg-[#252525] hover:bg-[#202020]"
            icon={
              <RiArrowRightSLine
                size={27}
                className={`${
                  !show ? "rotate-180" : ""
                } transition-all duration-300`}
              />
            }
          />
        </div>
      </div>

      {show && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="absolute top-5 right-2 flex items-center gap-x-3"
        >
          <IconButton
            aria-label="Edit"
            onClick={() => setShowModal(true)}
            icon={<GrEdit size={27} />}
            className={"bg-purple-600 hover:bg-purple-500"}
          />
          <IconButton
            aria-label="Delete"
            onClick={onDelete}
            icon={<GrTrash size={24} />}
            className={"bg-red-600 hover:bg-red-500"}
          />
        </motion.div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <TaskForm
          isEdit
          onClose={() => setShowModal(false)}
          prevTitle={task.title}
          prevDesc={task.description}
          prevCategory={task.category}
          todoId={task.id}
        />
      </Modal>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      >
        <div className="flex items-center justify-between text-zinc-100">
          <h2 className="text-xl font-bold text-center">Task Details</h2>
          <RiCloseFill
            size={27}
            className="cursor-pointer"
            onClick={() => setShowDetailsModal(false)}
          />
        </div>
        <div className="flex flex-col space-y-2 mt-5">
          <div className="flex items-center gap-x-3">
            <h3 className="text-lg font-semibold text-zinc-500">Category:</h3>
            <p className={`text-lg`}>{task.category}</p>
          </div>

          <div className="flex items-center gap-x-3">
            <h3 className="text-lg font-semibold text-zinc-500">Title:</h3>
            <p className="text-lg">{task.title}</p>
          </div>

          <div className="flex items-center gap-x-3">
            <h3 className="text-lg font-semibold text-zinc-500">
              Description:
            </h3>
            <p className="text-lg">
              {task.description || "No description provided"}
            </p>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Todo;
