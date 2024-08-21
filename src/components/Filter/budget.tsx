import React, { FC } from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import RangeSlider from "../DataRanger";

// Define keyframes for animation
const fadeIn = keyframes`  
  from {  
    opacity: 0;  
    transform: translateY(10px);  
  }  
  to {  
    opacity: 1;  
    transform: translateY(0);  
  }  
`;

// Styled components
const AnimatedBox = styled(Box)(() => ({
  animation: `${fadeIn} 0.5s ease-out`,
}));

interface BudgetProps {
  isOpen: boolean;
  onToggle: () => void;
  value: number[];
  onChange: (newValue: number[]) => void;
}

const Budget: FC<BudgetProps> = ({ isOpen, onToggle, value, onChange }) => {
  const handleChange = (event: Event, newValue: number | number[]): void => {
    onChange(newValue as number[]);
  };

  return (
    <div className={`${isOpen ? "p-3" : ""} text-white`}>
      {!isOpen ? (
        <div
          onClick={onToggle}
          className="cursor-pointer flex justify-between items-center"
        >
          <p className="text-white text-[20px] p-3">Budget</p>
          <span className="text-[14px] opacity-50 mr-2">{`$${value[0]} - $${value[1]}`}</span>
        </div>
      ) : (
        <>
          <AnimatedBox>
            <span className="text-[13px] pb-1 block">Budget</span>
          </AnimatedBox>
          <AnimatedBox>
            <RangeSlider value={value} onChange={handleChange} />
          </AnimatedBox>
        </>
      )}
    </div>
  );
};

export default Budget;
