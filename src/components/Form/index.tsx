import React, { ChangeEvent, useMemo } from "react";
import CheckBox from "../Checkbox";
import DateInput from "rsuite/DateInput";

interface FormProps {
  title: string;
  label: string;
  value: string | Date | null;
  text?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDateChange?: (date: Date | null) => void;
  checkValue?: string;
  visibleCheckboxes?: boolean;
  isSubscribed?: boolean;
  handleSubscribed?: (subscribed: boolean) => void;
}

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
    <div className="px-10 text-white mt-[15px] h-full">
      <div className="header">
        <h1 className="text-4xl font-bold leading-tight tracking-wide">
          {title}
        </h1>
      </div>
      <div className="body h-[85%] flex flex-col justify-center">
        {text && <p className="my-[20px]">{text}</p>}
        {label !== "Birthday" ? (
          <div>
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
          <div className="flex items-center mt-[40px]">
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
