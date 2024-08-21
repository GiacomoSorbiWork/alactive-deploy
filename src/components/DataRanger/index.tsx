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
        marginBottom: "0px",
        height: "70px",
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const barHeight = Math.floor(Math.random() * 50) + 15; // Random height between 15 and 65
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
  low: number; // Mandatory prop with value from parent
  high: number; // Mandatory prop with value from parent
}

const PriceRange: React.FC<PriceRangeProps> = ({ low, high }) => {
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

interface RangeSliderProps {
  value: number[];
  onChange: (event: Event, newValue: number | number[]) => void;
}

export default function RangeSlider({ value, onChange }: RangeSliderProps) {
  return (
    <>
      <MusicBar />
      <CustomSlider
        getAriaLabel={() => "Price range"}
        value={value}
        max={3000}
        onChange={onChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{
          marginTop: "-20px",
        }}
      />
      <PriceRange low={value[0]} high={value[1]} />
    </>
  );
}
