import React from "react";
import "./loading.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <svg
        viewBox="25 25 50 50"
        className="w-16 h-16"
        style={{
          animation: "rotate4 2s linear infinite",
        }}
      >
        <circle
          r="20"
          cy="50"
          cx="50"
          fill="none"
          stroke="var(--secondary-color)"
          strokeWidth="2"
          strokeDasharray="1, 200"
          strokeDashoffset="0"
          strokeLinecap="round"
          style={{
            animation: "dash4 1.5s ease-in-out infinite",
          }}
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
