import React from "react";
import PlusIcon from "../../../resources/svg/plus.svg";
import CheckIcon from "../../../resources/svg/check.svg";
import SearchIcon from "../../../resources/svg/search.svg";
import { ButtonProps } from "./type";

// Large Default Button
const LargeDefaultButton: React.FC<ButtonProps> = ({
  text = "Default",
  className = "",
  onClick,
}) => (
  <button
    className={`min-h-[56px] flex items-center justify-center rounded-normal p-big bg-activeButton ${className}`}
    onClick={onClick}
  >
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Large Disabled Button
const LargeDisabledButton: React.FC<ButtonProps> = ({
  text = "Disabled",
  className = "",
  onClick,
}) => (
  <button
    className={`min-h-[56px] flex items-center justify-center rounded-normal p-big bg-disabledButton ${className}`}
    onClick={onClick}
  >
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Large Button with Icon
const LargeIconButton: React.FC<ButtonProps> = ({
  text = "Add to list",
  icon = SearchIcon,
  onClick,
}) => (
  <button
    className="min-h-[56px] flex items-center justify-center rounded-normal p-big gap-small bg-activeButton"
    onClick={onClick}
  >
    <img src={icon} alt="icon" />
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Small Default Button
const SmallDefaultButton: React.FC<ButtonProps> = ({
  text = "Follow",
  onClick,
}) => (
  <button
    className="min-h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-activeButton"
    onClick={onClick}
  >
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Small Disabled Button
const SmallDisabledButton: React.FC<ButtonProps> = ({
  text = "Following",
  onClick,
}) => (
  <button
    className="min-h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-disabledButton"
    onClick={onClick}
  >
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Small Button with Icon
const SmallIconButton: React.FC<ButtonProps> = ({
  text = "Add to list",
  icon = PlusIcon,
  onClick,
}) => (
  <button
    className="min-h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-activeButton"
    onClick={onClick}
  >
    <img src={icon} alt="icon" />
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Small Disabled Button with Icon
const SmallDisabledIconButton: React.FC<ButtonProps> = ({
  text = "Added to list",
  icon = CheckIcon,
  onClick,
}) => (
  <button
    className="min-h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-disabledButton"
    onClick={onClick}
  >
    <img src={icon} alt="icon" />
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Text Only Button
const TextOnlyButton: React.FC<ButtonProps> = ({
  text = "Clear Filters",
  onClick,
}) => (
  <button
    className="min-h-[48px] flex items-center justify-center p-clear bg-transparent"
    onClick={onClick}
  >
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Round Button
const RoundedButton: React.FC<ButtonProps> = ({
  text = "Show More",
  onClick,
}) => (
  <button
    className="min-w-[135px] min-h-[30px] flex items-center justify-center rounded-rounded p-rounded bg-transparent border gap-normal"
    onClick={onClick}
  >
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Selected Button
const SelectedButton: React.FC<ButtonProps> = ({
  text = "Selected",
  className = "",
  onClick,
}) => (
  <button
    className={`min-h-[50px] flex items-center justify-center rounded-rounded p-rounded bg-activeButton border gap-normal ${className}`}
    onClick={onClick}
  >
    <span className="font-medium text-body-medium leading-[24px] tracking-[0.5px]">
      {text}
    </span>
  </button>
);

// UNelected Button
const UnselectedButton: React.FC<ButtonProps> = ({
  text = "Unselected",
  className = "",
  onClick,
}) => (
  <button
    className={`min-h-[50px] flex items-center justify-center rounded-rounded p-rounded bg-transparent border gap-normal ${className}`}
    onClick={onClick}
  >
    <span className="font-medium text-body-medium leading-[24px] tracking-[0.5px]">
      {text}
    </span>
  </button>
);

export {
  LargeDefaultButton,
  LargeDisabledButton,
  LargeIconButton,
  SmallDefaultButton,
  SmallDisabledButton,
  SmallIconButton,
  SmallDisabledIconButton,
  TextOnlyButton,
  RoundedButton,
  SelectedButton,
  UnselectedButton,
};
