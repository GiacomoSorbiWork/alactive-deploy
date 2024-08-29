import React, { useRef, useState, useEffect } from "react";
import { MediaViewProps } from "./type";

const VerticalScroll: React.FC<MediaViewProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of refs for video elements
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0); // To store the initial touch X coordinate
  const touchEndX = useRef(0); // To store the final touch X coordinate

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchEndX.current - touchStartX.current > 50) {
      const videoElement = videoRefs.current[activeIndex];
      if (videoElement) {
        videoElement.play();
      }
    } else if (touchEndX.current - touchStartX.current < 50) {
      const videoElement = videoRefs.current[activeIndex];
      if (videoElement) {
        videoElement.pause();
      }
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollTop;
    const itemHeight = scrollRef.current.clientHeight;
    const index = Math.round(scrollTop / itemHeight);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
      scrollRef.current.addEventListener("touchstart", handleTouchStart);
      scrollRef.current.addEventListener("touchmove", handleTouchMove);
      scrollRef.current.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
      scrollRef.current?.removeEventListener("touchstart", handleTouchStart);
      scrollRef.current?.removeEventListener("touchmove", handleTouchMove);
      scrollRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex]);

  return (
    <div
      className="flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth"
      ref={scrollRef}
      style={{ height: "100vh" }}
    >
      {items.map((item, index) => (
        <div
          className={`flex-shrink-0 flex justify-center items-center w-full h-screen snap-center cursor-pointer ${
            activeIndex === index ? "opacity-100" : "opacity-50"
          }`}
          key={index}
        >
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={item.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <video
              controls
              ref={(el) => (videoRefs.current[index] = el)}
              className="max-w-full max-h-full object-contain rounded-lg"
              autoPlay
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerticalScroll;
