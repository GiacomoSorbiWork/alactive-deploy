import React, { useRef, useEffect } from "react";
import { MediaViewProps } from "./type";
import playM3u8 from "../../util/playM3u8";

const HorizontalScroll: React.FC<MediaViewProps> = ({
  items: data,
  handleIndexChange, // now selected index
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.muted = false;
            if (video.src === "") {
              video.src = String(
                data?.find((event) => event.id == video.id)?.video
              );
              await playM3u8(video.src, video);
            }
          } else {
            video.muted = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videoRefs, data]);

  return (
    <div
      className="flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth"
      ref={scrollRef}
      style={{ height: "100vh", width: "100vw" }}
    >
      {data.map((item, index) => (
        <div
          className={`flex-shrink-0 flex justify-center items-center w-screen h-full snap-center cursor-pointer`}
          key={index}
        >
          <video
            key={item.id + "-video"}
            id={item.id}
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            controls
            playsInline
            className="max-w-full max-h-full object-contain rounded-lg"
            autoPlay
            muted
            loop
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default HorizontalScroll;
