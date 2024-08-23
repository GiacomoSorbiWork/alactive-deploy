import React, { useState } from "react";
import logo from "../../../resources/logo.svg";
import Login from "../Login";

const Home: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => setIsClicked(true);

  return (
    <div onClick={handleClick}>
      {!isClicked ? (
        <div className="bg-activeButton h-screen flex justify-center items-center cursor-pointer">
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <div className="bg-primaryContainer h-screen flex flex-col">
          <Login />
        </div>
      )}
    </div>
  );
};

export default Home;
