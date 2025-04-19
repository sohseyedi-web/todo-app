import { RiCloseFill } from "react-icons/ri";
import { useTodoStore } from "../../store/useStore";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";

type TaskFormProps = {
  onClose: () => void;
  prevTitle?: string;
  prevDesc?: string;
  prevCategory?: "personal" | "work" | "college";
  isEdit?: boolean;
  todoId?: string;
};

type FormValues = {
  title: string;
  description: string;
  category: "personal" | "work" | "college";
};

const TaskForm = ({
  onClose,
  prevTitle,
  prevDesc,
  prevCategory = "personal",
  isEdit = false,
  todoId,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      title: prevTitle || "",
      description: prevDesc || "",
      category: prevCategory,
    },
    mode: "onChange",
  });

  const { addTask, editTask } = useTodoStore();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!isEdit) {
      addTask(data.title, data.description, data.category);
      toast.success("Create New Todo");
    } else {
      editTask(todoId!, data.title, data.description, data.category);
      toast.success("Edit Todo Successfully");
    }
    onClose();
  };

  const isButtonDisabled = isEdit ? !isValid : !isValid || !isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex items-center justify-between text-zinc-100">
        <h2 className="text-xl font-bold text-center">
          {isEdit ? "Edit Task" : "Add New Task"}
        </h2>
        <RiCloseFill size={27} className="cursor-pointer" onClick={onClose} />
      </div>

      <div>
        <input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
            maxLength: {
              value: 50,
              message: "Title cannot exceed 50 characters",
            },
          })}
          placeholder="Title ..."
          className={`px-2 border rounded-xl h-[45px] outline-none border-zinc-700 bg-[#161616] text-white w-full ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("description", {
            maxLength: {
              value: 200,
              message: "Description cannot exceed 200 characters",
            },
          })}
          placeholder="Optional description"
          className={`p-2 border rounded-xl h-[125px] resize-none outline-none border-zinc-700 bg-[#161616] text-white w-full ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <select
          {...register("category", {
            required: "Please select a category",
          })}
          className={`px-2 border rounded-xl h-[45px] outline-none border-zinc-700 bg-[#161616] text-white w-full ${
            errors.category ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="college">College</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`${
          isEdit ? "bg-indigo-700" : "bg-[#101010]"
        } w-full h-[45px] text-zinc-100 text-lg transition-all duration-300 rounded-xl ${
          isButtonDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-800"
        }`}
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
