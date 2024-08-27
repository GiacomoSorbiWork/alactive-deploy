import React, { useState, FC, MouseEvent } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IconButton, Box, Typography } from "@mui/material";
import { keyframes, styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { WhenProps, DatePickerFieldProps } from "./type";

const TextBox = styled(Typography)(() => ({
  color: "white",
  fontSize: "14px",
  fontWeight: "100",
}));

const StyledIconButton = styled(IconButton)(() => ({
  color: "black",
  width: "15px",
  height: "15px",
}));

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

// DatePickerField Component
const DatePickerField: FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  onClear,
}) => {
  const [openModel, setOpenModel] = useState(false);

  const handleOpen = () => {
    if (!openModel) setOpenModel(true);
  };

  const handleClose = () => {
    setOpenModel(false);
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    onClear();
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className="flex items-center justify-between bg-secondaryContainer rounded-big py-[5px] px-2 flex-grow cursor-pointer min-h-[35px]"
        onClick={handleOpen}
      >
        <TextBox>{label}</TextBox>
        {value && (
          <div className="flex items-center justify-between p-[6px] bg-white bg-opacity-10 rounded-big">
            <TextBox sx={{ fontSize: "12px" }}>
              {value.format(label === "Month" ? "MMMM" : "YYYY")}
            </TextBox>
            <StyledIconButton size="small" onClick={handleClear}>
              <CloseIcon
                style={{
                  width: "15px",
                  height: "15px",
                  color: "white",
                  marginLeft: "5px",
                }}
              />
            </StyledIconButton>
          </div>
        )}
        <Box hidden>
          <DatePicker
            open={openModel}
            views={[label.toLowerCase() as "month" | "year"]}
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              handleClose();
            }}
            onClose={handleClose}
          />
        </Box>
      </div>
    </LocalizationProvider>
  );
};

// When Component

const When: FC<WhenProps> = ({
  isOpen,
  onToggle,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
  return (
    <div className="my-6 text-white">
      {!isOpen ? (
        <div
          onClick={onToggle}
          className="cursor-pointer flex justify-between items-center"
        >
          <p className="text-body-medium font-semibold">When</p>
          <span className="text-body-small opacity-50 mr-2">
            {selectedMonth ? selectedMonth.format("MMMM") : ""}
            {selectedMonth && selectedYear ? ", " : ""}
            {selectedYear ? selectedYear.format("YYYY") : ""}
          </span>
        </div>
      ) : (
        <AnimatedBox>
          <p className="text-body-medium mb-2">When</p>
          <div className="flex justify-between items-center w-full gap-big">
            <DatePickerField
              label="Month"
              value={selectedMonth}
              onChange={setSelectedMonth}
              onClear={() => setSelectedMonth(null)}
            />
            <DatePickerField
              label="Year"
              value={selectedYear}
              onChange={setSelectedYear}
              onClear={() => setSelectedYear(null)}
            />
          </div>
        </AnimatedBox>
      )}
    </div>
  );
};

export default When;
