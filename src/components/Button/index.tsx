import React from "react";

interface ButtonProps {
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, isActive = false, onClick }) => {
  return (
    <div
      className={`flex p-[15px] justify-center items-center rounded-[0.4rem] my-[30px] mx-[6px] ${
        isActive
          ? "bg-[var(--primary-color)]"
          : "bg-gray-400 cursor-not-allowed"
      }`}
      onClick={isActive ? onClick : undefined} // Prevent click if not active
    >
      <button
        className={`${isActive ? "" : "cursor-not-allowed"}`} // Apply cursor style conditionally
        disabled={!isActive} // Disable the button if it's not active
      >
        <span className="text-white font-[16px]">{text}</span>
      </button>
    </div>
  );
};

export default Button;
