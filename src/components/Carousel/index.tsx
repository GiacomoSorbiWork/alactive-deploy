import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import playM3u8 from "../../util/playM3u8";

interface CarouselItemProps {
  video: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playM3u8(video, videoRef.current);
    }
  }, [video]); // Effect will run when 'video' changes

  return (
    <Paper
      style={{
        textAlign: "center",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        key={video}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      ></video>
    </Paper>
  );
};
interface CustomCarouselProps {
  items: string[] | undefined; //
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ items }) => {
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
        {items &&
          items.map((item, index) => <CarouselItem key={index} video={item} />)}
      </Carousel>
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          zIndex: 1,
        }}
      >
        {items &&
          items.map((_, index) => (
            <Box key={index} mx={0.5}>
              {index === currentIndex ? (
                <RadioButtonCheckedIcon
                  style={{ color: "#fff", fontSize: "8px" }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  style={{ color: "#fff", fontSize: "8px" }}
                />
              )}
            </Box>
          ))}
      </Box>
    </div>
  );
};

export default CustomCarousel;
