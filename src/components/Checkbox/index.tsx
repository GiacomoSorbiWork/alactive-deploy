import React, { ChangeEvent, useState } from "react";
import { CheckBoxProps } from "./type";

const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked = true,
  handleSubscribed = () => {},
}) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    handleSubscribed(newChecked); // Call the provided callback function with the new checked state
  };

  return (
    <div className="flex items-center mr-3">
      <input
        type="checkbox"
        id="custom-checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="sr-only" // Hides the default checkbox
      />
      <label
        htmlFor="custom-checkbox"
        className={`flex items-center justify-center w-4 h-4 rounded cursor-pointer ${
          checked
            ? "bg-[var(--primary-color)]"
            : "bg-transparent border-gray-400 border-2"
        } transition-colors duration-200`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </label>
    </div>
  );
};

export default CheckBox;
