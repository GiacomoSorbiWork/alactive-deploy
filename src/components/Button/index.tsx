import React from "react";
import { SvgIconComponent } from "@mui/icons-material";

interface ButtonProps {
  text: string;
  isActive?: boolean;
  svg?: SvgIconComponent;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  isActive = false,
  svg: Icon,
  onClick,
}) => {
  return (
    <div
      className={`flex p-[15px] justify-center items-center rounded-[0.4rem] my-[30px] mx-[6px] ${
        isActive
          ? "bg-[var(--primary-color)]"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      onClick={isActive ? onClick : undefined} // Prevent click if not active
    >
      {Icon && (
        <Icon className="text-white mr-[8px]" /> // Add margin-right for spacing
      )}
      <button
        className={`text-white font-[16px] ${
          isActive ? "" : "cursor-not-allowed"
        }`} // Conditionally apply cursor
        disabled={!isActive} // Disable the button if it's not active
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
