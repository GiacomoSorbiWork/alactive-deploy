import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { ProgressBarProps } from "./type";

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const limit = 7;

  // Ensure the progress value is clamped between 0 and the defined limit
  const clampedProgress = Math.max(0, Math.min(progress, limit));

  return (
    <div className="bg-black">
      <LinearProgress
        sx={{
          backgroundColor: "var(--secondary-container-color)", // Background color of the progress bar
          "& .MuiLinearProgress-bar": {
            backgroundColor: "var(--secondary-color)", // Color of the progress indicator
          },
          height: "12px", // Height of the progress bar
        }}
        variant="determinate"
        value={(clampedProgress / limit) * 100} // Calculate percentage of progress
        role="progressbar" // ARIA role for accessibility
        aria-valuenow={clampedProgress} // Current progress value
        aria-valuemin={0} // Minimum progress value
        aria-valuemax={100} // Maximum progress value
      />
    </div>
  );
};
