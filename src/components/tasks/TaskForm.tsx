import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useTodoStore } from "../../store/useStore";
import toast from "react-hot-toast";

type TaskFormProps = {
  onClose: () => void;
  prevTitle?: string;
  prevDesc?: string;
  prevCategory?: "personal" | "work" | "college";
  isEdit?: boolean;
  todoId?: string;
};

const TaskForm = ({
  onClose,
  prevTitle,
  prevDesc,
  prevCategory = "personal",
  isEdit = false,
  todoId,
}: TaskFormProps) => {
  const [title, setTitle] = useState(prevTitle || "");
  const [description, setDescription] = useState(prevDesc || "");
  const [category, setCategory] = useState<"personal" | "work" | "college">(
    prevCategory
  );

  const { addTask, editTask } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (!isEdit) {
        addTask(title, description, category);
        toast.success("Create New Todo");
      } else {
        editTask(todoId!, title, description, category);
        toast.success("Edit Todo Successfully");
      }
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex items-center justify-between text-zinc-100">
        <h2 className="text-xl font-bold text-center">
          {isEdit ? "Edit Task" : "Add New Task"}
        </h2>
        <RiCloseFill size={27} className="cursor-pointer" onClick={onClose} />
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title ..."
        className="px-2 border rounded-xl h-[45px] outline-none border-zinc-700 bg-[#161616] text-white"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Optional description"
        className="p-2 border rounded-xl h-[125px] resize-none outline-none border-zinc-700 bg-[#161616] text-white"
      />
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as "personal" | "work" | "college")
        }
        className="px-2 border rounded-xl h-[45px] outline-none border-zinc-700 bg-[#161616] text-white"
      >
        <option value="none">Select Category</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="college">College</option>
      </select>
      <button
        type="submit"
        className={`${
          isEdit ? "bg-indigo-700" : "bg-[#101010]"
        } w-full h-[45px] text-zinc-100 text-lg hover:bg-gray-800 transition-all duration-300 rounded-xl`}
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
