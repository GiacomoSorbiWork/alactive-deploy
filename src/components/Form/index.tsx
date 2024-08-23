import React, { useMemo } from "react";
import CheckBox from "../Checkbox";
import DateInput from "rsuite/DateInput";
import { FormProps } from "./type";

const Form: React.FC<FormProps> = ({
  title,
  label,
  value,
  text,
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

  const validationMessage = useMemo(() => {
    if (!isUsernameField) return null;
    if (typeof value === "string" && value.length > 0) {
      if (usernameTooLong) {
        return {
          text: "Maximum number of characters is 15.",
          color: "text-red-500",
          underline: "border-red-500",
        };
      }
      return {
        text: "Username available",
        color: "text-green-500",
        underline: "border-green-500",
      };
    }
    return null;
  }, [value]);

  return (
    <div className="px-10 text-white">
      <h1 className="text-title-large font-bold leading-[120%] mb-[41px] min-h-24">
        {title}
      </h1>
      <div className="flex flex-col min-h-[185px]">
        {text && <p>{text}</p>}
        {label !== "Birthday" ? (
          <div className="mb-[41px]">
            <input
              id="input"
              className={`w-full bg-transparent border-b ${
                validationMessage ? validationMessage.underline : "border-white"
              } text-lg p-1`}
              type={label === "Email Address" ? "email" : "text"}
              aria-label={label}
              value={value as string}
              placeholder={label}
              onChange={onChange}
              required
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
            <p className="text-[20px] mt-3">Your age will not be public.</p>
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
