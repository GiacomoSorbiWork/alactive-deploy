import React, { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Media, MediaViewProps } from "./type";

const HorizontalScroll: React.FC<MediaViewProps> = ({ items }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenItem, setFullScreenItem] = useState<Media | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" }),
    onSwipedRight: () =>
      scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" }),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const toggleFullScreen = (item: Media) => {
    setFullScreenItem(item);
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {isFullScreen && fullScreenItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setIsFullScreen(false)}
        >
          {fullScreenItem.type === "image" ? (
            <img
              src={fullScreenItem.src}
              alt={fullScreenItem.alt}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video controls className="max-w-full max-h-full object-contain">
              <source src={fullScreenItem.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      <div
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        {...handlers}
        ref={scrollRef}
      >
        {items.map((item, index) => (
          <div
            className="flex-shrink-0 flex justify-center items-center w-full max-w-xs mr-4 snap-center cursor-pointer"
            key={index}
            onClick={() => toggleFullScreen(item)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-contain rounded-lg"
              />
            ) : (
              <video
                controls
                className="w-full h-auto object-contain rounded-lg"
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

export default HorizontalScroll;
