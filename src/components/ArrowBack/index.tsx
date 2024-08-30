import React from "react";
import arrowBack from "../../../resources/arrow back.svg";

const ArrowBack: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src={arrowBack}
    alt="Back"
    className={`cursor-pointer my-6 absolute z-50 ${className}`}
    onClick={() => history.back()}
  />
);
export default ArrowBack;
