import React, { FC } from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import RangeSlider from "../DataRanger";
import { BudgetProps } from "./type";

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

const Budget: FC<BudgetProps> = ({ isOpen, onToggle, value, onChange }) => {
  const handleChange = (event: Event, newValue: number | number[]): void => {
    onChange(newValue as number[]);
  };

  return (
    <div className="text-white my-6 overflow-hidden">
      {!isOpen ? (
        <div
          onClick={onToggle}
          className="cursor-pointer flex justify-between items-center"
        >
          <p className="text-body-medium font-semibold">Budget</p>
          <span className="text-body-small opacity-50 mr-2">{`$${value[0]} - $${value[1]}`}</span>
        </div>
      ) : (
        <>
          <AnimatedBox>
            <span className="text-body-medium">Budget</span>
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
