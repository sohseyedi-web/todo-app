import React from "react";

type CategoryFilterProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    value: string;
    name: string;
  }[];
};

const CategoryFilter = ({ value, onChange, options }: CategoryFilterProps) => {
  return (
    <div className="w-1/2 md:w-48">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-1 py-2 cursor-pointer rounded-xl border border-zinc-700 bg-[#212121] text-zinc-100 focus:outline-none"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
