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
      {items && items.length > 0 ? (
        <>
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
          {items.map((item, index) => <CarouselItem key={index} url={item} />)}
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
          {items.map((_, index) => (
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
      </>
    ) : (
      <div
  style={{
    height: "400px",
    backgroundColor: "#e0e0e0",
    position: "relative",
    overflow: "hidden",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
      animation: "shine 1.5s infinite",
    }}
  />
  <style>{`
    @keyframes shine {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `}</style>
</div>
    )}
    </div>
  );
};

export default CustomCarousel;
