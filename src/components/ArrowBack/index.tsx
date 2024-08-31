import React from "react";
import arrowBack from "../../../resources/svg/arrow_back_ios.svg";

const ArrowBack: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src={arrowBack}
    alt="Back"
    className={`cursor-pointer my-6 m-4 absolute z-50 left-0 ${className}`}
    onClick={() => history.back()}
  />
);
export default ArrowBack;
