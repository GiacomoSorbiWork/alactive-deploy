import React, { useRef, useEffect } from "react";
import { MediaViewProps } from "./type";

const HorizontalScroll: React.FC<MediaViewProps> = ({
  items,
  handleIndexChange, // now selected index
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollTop;
    const itemHeight = scrollRef.current.clientHeight;
    const index = Math.round(scrollLeft / itemHeight);

    // Check if handleIndexChange is defined before calling it
    if (handleIndexChange) {
      handleIndexChange(index); // Notify the parent component about the index change
    }
  };

  useEffect(() => {
    const currentScrollRef = scrollRef.current;

    if (currentScrollRef) {
      currentScrollRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth"
      ref={scrollRef}
      style={{ height: "100vh", width: "100vw" }}
    >
      {items.map((item, index) => (
        <div
          className={`flex-shrink-0 flex justify-center items-center w-screen h-full snap-center cursor-pointer`}
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
              playsInline
              className="max-w-full max-h-full object-contain rounded-lg"
              autoPlay
              muted
              loop
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

export default HorizontalScroll;
