import React from "react";
import arrowBack from "../../../resources/arrow back.svg";

const ArrowBack = () => (
  <img
    src={arrowBack}
    alt="Back"
    className="cursor-pointer my-6 absolute z-50"
    onClick={() => history.back()}
  />
);
export default ArrowBack;
