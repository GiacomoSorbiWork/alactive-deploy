import React, { useState } from "react";
import { SelectListProps } from "./type";
import { SelectedButton, UnselectedButton } from "../../subComponents/Buttons";

const SelectList: React.FC<SelectListProps> = ({ data, onClick }) => {
  const [isActiveItem, setIsActiveItem] = useState<string>("");
  const handleClick = (item: string) => {
    setIsActiveItem(isActiveItem === item ? "" : item);
    onClick(item);
  };

  return (
    <div className="flex flex-wrap">
      <div className="px-[30px]">
        <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px] mb-1">
          Select your favorite music genres for nights out
        </h1>
      </div>
      <div className="flex flex-col w-full">
        {data.map((item) =>
          isActiveItem === item ? (
            <SelectedButton
              key={item}
              text={item}
              onClick={() => handleClick(item)}
              className="my-[10px]"
            />
          ) : (
            <UnselectedButton
              key={item}
              text={item}
              onClick={() => handleClick(item)}
              className="my-[10px]"
            />
          )
        )}
      </div>
    </div>
  );
};

export default SelectList;
