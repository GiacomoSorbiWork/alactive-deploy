import React from "react";
import "./loading.css"; // Import the CSS styles

const Loading: React.FC = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="loader">
        <span className="loader-text">loading</span>
        <span className="load"></span>
      </div>
    </div>
  );
};

export default Loading;
