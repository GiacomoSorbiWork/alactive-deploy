import React from "react";
import PlusIcon from "../../../resources/svg/plus.svg";
import CheckIcon from "../../../resources/svg/check.svg";
import SearchIcon from "../../../resources/svg/search.svg";
import { ButtonProps } from "./type";

// Large Default Button
const LargeDefaultButton: React.FC<ButtonProps> = ({ text = "Default" }) => (
  <button className="h-[56px] flex items-center justify-center rounded-normal p-big bg-activeButton">
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Large Disabled Button
const LargeDisabledButton: React.FC<ButtonProps> = ({ text = "Disabled" }) => (
  <button className="h-[56px] flex items-center justify-center rounded-normal p-big bg-disabledButton">
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Large Button with Icon
const LargeIconButton: React.FC<ButtonProps> = ({
  text = "Add to list",
  icon = SearchIcon,
}) => (
  <button className="h-[56px] flex items-center justify-center rounded-normal p-big gap-small bg-activeButton">
    <img src={icon} alt="icon" />
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Small Default Button
const SmallDefaultButton: React.FC<ButtonProps> = ({ text = "Follow" }) => (
  <button className="h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-activeButton">
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Small Disabled Button
const SmallDisabledButton: React.FC<ButtonProps> = ({ text = "Following" }) => (
  <button className="h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-disabledButton">
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Small Button with Icon
const SmallIconButton: React.FC<ButtonProps> = ({
  text = "Add to list",
  icon = PlusIcon,
}) => (
  <button className="h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-activeButton">
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
}) => (
  <button className="h-[36px] flex items-center justify-center rounded-normal p-small gap-small bg-disabledButton">
    <img src={icon} alt="icon" />
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Text Only Button
const TextOnlyButton: React.FC<ButtonProps> = ({ text = "Clear Filters" }) => (
  <button className="h-[48px] flex items-center justify-center p-clear bg-transparent">
    <span className="font-semibold text-body-small leading-[16.94px]">
      {text}
    </span>
  </button>
);

// Round Button
const RoundedButton: React.FC<ButtonProps> = ({ text = "Show More" }) => (
  <button className="w-[135px] h-[30px] flex items-center justify-center rounded-rounded p-rounded bg-transparent border gap-normal">
    <span className="font-semibold text-body-small leading-[16.94px]">
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
};
