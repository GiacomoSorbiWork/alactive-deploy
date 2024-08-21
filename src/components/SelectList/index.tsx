import React, { useState } from "react";
import { SelectListProps } from "./type";

const SelectList: React.FC<SelectListProps> = ({ data, onClick }) => {
  const [isActiveItem, setIsActiveItem] = useState<string>("");
  const handleClick = (item: string) => {
    setIsActiveItem(isActiveItem === item ? "" : item);
    onClick(item);
  };

  return (
    <div className="flex flex-wrap">
      <div className="px-[38px]">
        <h1 className="text-4xl font-bold leading-tight tracking-wide text-white">
          Select your favorite music genres for nights out
        </h1>
      </div>
      {data.map((item) => (
        <button
          key={item}
          className={`m-2 p-2 w-full rounded-[30px] border text-white ${
            isActiveItem == item
              ? "bg-[var(--primary-color)]"
              : "bg-transparent"
          }`}
          onClick={() => handleClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default SelectList;
