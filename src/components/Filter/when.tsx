import React, { useState, FC, MouseEvent } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IconButton, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { WhenProps, DatePickerFieldProps } from "./type";

// Styled components
const DemoContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  width: "100%",
  alignItems: "center",
}));

const CustomBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "#3d3d3d",
  borderRadius: "8px",
  padding: "5px 8px",
  flexGrow: 1,
  color: "white",
  cursor: "pointer",
  minHeight: "34px",
}));

const SelectedValueBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "3px 6px",
  backgroundColor: "#515151",
  borderRadius: "7px",
  marginLeft: "8px",
}));

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
      <CustomBox
        onClick={() => {
          handleOpen();
        }}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <TextBox>{label}</TextBox>
        {value && (
          <SelectedValueBox>
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
          </SelectedValueBox>
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
      </CustomBox>
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
    <>
      <div className={`${isOpen ? "p-3" : ""} text-white`}>
        {!isOpen ? (
          <div
            onClick={onToggle}
            className="cursor-pointer flex justify-between items-center"
          >
            <p className="text-white text-[20px] p-3">When</p>
            <span className="text-[14px] opacity-50 mr-2">
              {selectedMonth ? selectedMonth.format("MMMM") : ""}
              {selectedMonth && selectedYear ? ", " : ""}
              {selectedYear ? selectedYear.format("YYYY") : ""}
            </span>
          </div>
        ) : (
          <>
            <Typography className="text-[13px] pb-1">When</Typography>
            <DemoContainer>
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
            </DemoContainer>
          </>
        )}
      </div>
    </>
  );
};

export default When;
