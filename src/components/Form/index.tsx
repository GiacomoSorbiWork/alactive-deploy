import React, { useEffect, useMemo, useState } from "react";
import CheckBox from "../../subComponents/Checkbox";
import DateInput from "rsuite/DateInput";
import { FormProps } from "./type";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "../../../resources/svg/clear.svg";

const Form: React.FC<FormProps> = ({
  title,
  label,
  value,
  text,
  helperText,
  placeholderText,
  onChange,
  onDateChange,
  checkValue = "I want to receive news, updates, and offers from Alactive",
  visibleCheckboxes = true,
  isSubscribed,
  handleSubscribed,
  errorMessage,
}) => {
  const isUsernameField = label === "Username";
  const usernameTooLong =
    isUsernameField && typeof value === "string" && value.length > 15;
  const [isEmptyText, setIsEmptyText] = useState(true);
  const [helperTextState, setHelperText] = useState(helperText);

  const validationMessage = useMemo(() => {
    if (!isUsernameField) return null;

    if (typeof value === "string") {
      if (value.length === 0) {
        return {
          text: "Username is required.",
          color: "text-gray-500",
          underline: "border-gray-500",
        };
      } else if (usernameTooLong) {
        return {
          text: "Maximum number of characters is 15.",
          color: "text-red-500",
          underline: "border-red-500",
        };
      } else {
        return {
          text: "Username available",
          color: "text-green-500",
          underline: "border-green-500",
        };
      }
    }
    return null;
  }, [value]);

  useEffect(() => {
    if (value) {
      setIsEmptyText(false);
    } else setIsEmptyText(true);

    if (
      label.toString().includes("Handle") &&
      !value?.toString().startsWith("@")
    ) {
      setHelperText("Handle should be started @.");
    } else setHelperText(helperText);
  }, [value]);

  const handleClear = () => {
    if (onChange != undefined)
      onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="text-white">
      <h1 className="text-title-large font-bold leading-[120%] mb-[41px] min-h-24">
        {title}
      </h1>
      <div className="flex flex-col min-h-[185px]">
        {text && <p>{text}</p>}
        {label !== "Birthday" ? (
          <div className="mb-[41px]">
            <TextField
              id="input"
              className={`w-full ${
                validationMessage ? validationMessage.underline : "border-white"
              } text-lg p-1`}
              type={label === "Email Address" ? "email" : "text"}
              label={label}
              value={value as string}
              onChange={onChange}
              placeholder={placeholderText}
              helperText={helperTextState}
              required
              InputProps={{
                endAdornment: value ? (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} edge="end">
                      <img
                        src={ClearIcon}
                        style={{ color: "var(--secondary-color)" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isEmptyText
                    ? "var(--secondary-container-color) !important"
                    : "var(--secondary-color) !important",
                },
                "& .MuiFormLabel-root": {
                  color: isEmptyText
                    ? "var(--secondary-container-color) !important"
                    : "var(--secondary-color) !important",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiFormHelperText-root": {
                  color: "var(--secondary-container-color)",
                },
              }}
              focused
            />
            {validationMessage && (
              <p className={`mt-2 ${validationMessage.color}`}>
                {validationMessage.text}
              </p>
            )}
            {errorMessage && (
              <p className={`mt-2 text-red-500`}>{errorMessage}</p>
            )}
          </div>
        ) : (
          <>
            <DateInput
              format="dd/MM/yyyy"
              placeholder="DD/MM/YYYY"
              className="bg-transparent text-[25px] tracking-[5px]"
              value={value as Date}
              onChange={onDateChange}
            />
            <p className="text-body-medium opacity-50 mt-3">{helperText}</p>
          </>
        )}
        {visibleCheckboxes && (
          <div className="flex items-center mb-[41px]">
            <CheckBox
              handleSubscribed={handleSubscribed}
              isChecked={isSubscribed}
            />
            <span className="ml-2">{checkValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
