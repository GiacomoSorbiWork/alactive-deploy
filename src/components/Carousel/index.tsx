import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { ItemProps, Item } from "./types";

const CarouselItem: React.FC<ItemProps> = ({ item }) => {
  return (
    <Paper
      style={{
        textAlign: "center",
        backgroundImage: `url(${item.imgPath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
      }}
    >
      <div className="bg-detailImageGradient h-full w-full p-[20px]" />
    </Paper>
  );
};

const CustomCarousel: React.FC<{ items: Item[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (now?: number) => {
    if (now !== undefined) {
      setCurrentIndex(now);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Carousel
        autoPlay={false}
        indicators={false}
        navButtonsAlwaysVisible={false}
        animation="slide"
        onChange={handleChange}
        sx={{
          height: "400px",
        }}
      >
        {items.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Carousel>
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff", // Set color of the indicators to white
          zIndex: 1, // Ensure indicators have higher z-index
        }}
      >
        {items.map((_, index) => (
          <Box key={index} mx={0.5}>
            {index === currentIndex ? (
              <RadioButtonCheckedIcon
                style={{ color: "#fff", fontSize: "8px" }} // White color and smaller size for the filled circle
              />
            ) : (
              <RadioButtonUncheckedIcon
                style={{ color: "#fff", fontSize: "8px" }} // White color and smaller size for the outlined circle
              />
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default CustomCarousel;
