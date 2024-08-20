import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

function valuetext(value: number) {
  return `${value}°C`;
}

const CustomSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    borderRadius: "5px", // Change the slider thumb to a square
    backgroundColor: "var(--primary-color)", // Set thumb color
    width: "23px",
    height: "23px",
  },
  "& .MuiSlider-track": {
    backgroundColor: "var(--secondary-color)", // Set track color
    border: 0,
  },
  "& .MuiSlider-rail": {
    backgroundColor: "var(--primary-color)", // Set the rail color (the inactive part of the track)
  },
});

const MusicBar: React.FC<{ count?: number }> = ({ count = 20 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "3px",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const barHeight = Math.floor(Math.random() * 50) + 15; // Random height between 5 and 35
        return (
          <Box
            key={i}
            sx={{
              height: `${barHeight}px`,
              width: "6px",
              backgroundColor: "var(--primary-color)",
            }}
          />
        );
      })}
    </Box>
  );
};

interface PriceRangeProps {
  low?: number; // Optional prop with default
  high?: number; // Optional prop with default
}

const PriceRange: React.FC<PriceRangeProps> = ({ low = 80, high = 2000 }) => {
  return (
    <div className="flex items-center text-white">
      <div className="bg-[var(--secondary-color)] m-2.5 rounded-[30px] flex flex-col items-start p-[5px] pl-4 w-[45%] text-center">
        <p className="text-[11px] leading-4">Low</p>
        <p className="text-1xl font-medium leading-4">${low}</p>
      </div>
      <div className="bg-[var(--secondary-color)] m-2.5 rounded-[30px] flex flex-col items-start p-[5px] pl-4 w-[45%] text-center">
        <p className="text-[11px] leading-4">High</p>
        <p className="text-1xl font-medium leading-4">${high}</p>
      </div>
    </div>
  );
};

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <>
      <MusicBar />
      <CustomSlider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{
          marginTop: "-20px",
        }}
      />
      <PriceRange />
    </>
  );
}
