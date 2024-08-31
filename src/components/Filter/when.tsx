import React, { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Box, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";
import { WhenProps } from "./type";
import { Dayjs } from "dayjs";

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

// DateRangePicker Component
const When: FC<WhenProps> = ({
  isOpen,
  onToggle,
  selectedRange,
  setSelectedRange,
}) => {
  return (
    <div className="my-6 text-white">
      <div onClick={onToggle} className="cursor-pointer flex justify-between">
        <Typography className="text-body-medium font-semibold">When</Typography>
        <span className="text-body-small opacity-50 mr-2">
          {selectedRange[0] ? selectedRange[0].format("MMMM D") : ""}
          {selectedRange[0] && selectedRange[1] ? " - " : ""}
          {selectedRange[1] ? selectedRange[1].format("MMMM D") : ""}
        </span>
      </div>
      {isOpen && (
        <AnimatedBox>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={selectedRange}
              onChange={(newValue: [Dayjs | null, Dayjs | null]) =>
                (setSelectedRange ?? (() => {}))(newValue)
              }
              localeText={{ start: "Start", end: "End" }}
              className="pt-4"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ffffff3b",
                },
              }}
            />
          </LocalizationProvider>
        </AnimatedBox>
      )}
    </div>
  );
};

export default When;
