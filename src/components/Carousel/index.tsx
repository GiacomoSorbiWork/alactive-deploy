import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import playM3u8 from "../../util/playM3u8";

interface CarouselItemProps {
  url: string;
}

const isVideoUrl = (url: string) => {
  const videoAllowUrl = ["m3u8", "avi", "mp4", "mov"];
  return videoAllowUrl.some((ext) => url.endsWith(`.${ext}`));
};

const CarouselItem: React.FC<CarouselItemProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              video.muted = false;
              playM3u8(url, video);
            } else {
              video.muted = true;
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(videoRef.current);
      return () => {
        if (videoRef.current) observer.unobserve(videoRef.current);
      };
    }
  }, [videoRef, url]);

  return (
    <Paper
      style={{
        textAlign: "center",
        height: "400px",
        overflow: "hidden",
      }}
    >
      {isVideoUrl(url) ? (
        <video
          ref={videoRef}
          key={url}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
					autoPlay
        ></video>
      ) : (
        <img
          src={url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
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
          items.map((item, index) => <CarouselItem key={index} url={item} />)}
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
