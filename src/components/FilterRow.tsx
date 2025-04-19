import { useTodoStore } from "../store/useStore";
import CategoryFilter from "./common/CategoryFilter";

const statusButtons = [
  { name: "All Status", value: "all" },
  { name: "Active", value: "active" },
  { name: "Completed", value: "completed" },
];

const categoryOptions = [
  { name: "All Category", value: "all" },
  { name: "Personal", value: "personal" },
  { name: "Work", value: "work" },
  { name: "College", value: "college" },
];

const FilterRow = () => {
  const { setFilter, filter, setCategoryFilter, categoryFilter } =
    useTodoStore();

  return (
    <div className="flex gap-3 w-full">
      <CategoryFilter
        options={statusButtons}
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as "all" | "active" | "completed")
        }
      />

      <CategoryFilter
        options={categoryOptions}
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(
            e.target.value as "all" | "personal" | "work" | "college"
          )
        }
      />
    </div>
  );
};

export default FilterRow;
