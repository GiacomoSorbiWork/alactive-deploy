import React, { FC, ChangeEventHandler } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { InputAdornment, TextField } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { LocationProps } from "./type";

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

// Apply styles, including the fade-in animation
const CustomTextField = styled(TextField)(() => ({
  animation: `${fadeIn} 0.5s ease-out`,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // Removes the border when not focused
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Removes the border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Removes the border on focus
    },
  },
}));

const Location: FC<LocationProps> = ({ isOpen, onToggle, value, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={`text-white my-6`}>
      {!isOpen ? (
        <div
          onClick={onToggle}
          className="cursor-pointer flex justify-between items-center"
        >
          <p className="text-body-medium">Location</p>
          {value && (
            <span className="text-body-small opacity-50 mr-2">{value}</span>
          )}
        </div>
      ) : (
        <>
          <span className="text-body-medium pb-1 block">Location</span>
          <CustomTextField
            className="bg-secondaryContainer rounded-rounded w-full border-0"
            size="small"
            value={value}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon /> Search
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{ display: value === "" ? "none" : "flex" }}
                >
                  <ClearIcon />
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
    </div>
  );
};

export default Location;
