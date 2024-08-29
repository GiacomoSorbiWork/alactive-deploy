import React, { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { MediaViewProps } from "./type";

const VerticalScroll: React.FC<MediaViewProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedUp: () =>
      scrollRef.current?.scrollBy({ top: 300, behavior: "smooth" }),
    onSwipedDown: () =>
      scrollRef.current?.scrollBy({ top: -300, behavior: "smooth" }),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

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
    }
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth"
        {...handlers}
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
                className="max-w-full max-h-full object-contain rounded-lg"
              >
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default VerticalScroll;
