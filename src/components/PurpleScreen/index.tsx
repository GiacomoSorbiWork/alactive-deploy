import React from "react";
import logo from "../../../resources/logo.svg";

export const PurpleScreen = () => {
  return (
    <div className="h-screen w-screen bg-secondary flex items-center justify-center">
			<img src={logo} alt="logo" className="h-[180px]" />
		</div>
  );
};
