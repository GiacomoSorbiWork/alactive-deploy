import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { EventCardProps } from "./type";
import CreditSVG from "../../../resources/svg/solar_wallet-linear.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import ThumbUPSVG from "../../../resources/svg/thumbvector.svg";
import MusicSVG from "../../../resources/svg/musical-note-music-svgrepo-com.svg";

const EventCard: React.FC<EventCardProps> = ({
  imgUrl,
  videoUrl,
  cardId,
  title,
  titleLogo,
  date,
  location,
  price,
  musicType,
  purpose = "card",
  selectFunc,
  isChecked = false,
  nextURL = "event-detail",
  className = "",
}) => {
  const history = useHistory();
  const isCard = purpose === "card";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClick = () => {
    if (selectFunc) {
      selectFunc(cardId) 
    } else {
      history.push(`/${nextURL}`);
    }
  };

  // Handle video playback based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.muted = false;
          } else {
            video.muted = true;
          }
        });
      },
      {
        threshold: 0.5, // Adjust the threshold as needed
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative w-full snap-start ${
        isCard ? "mb-4 aspect-[190/300]" : "mb-3 aspect-[364/554]"
      } rounded-xl overflow-hidden bg-cover bg-center text-white border border-white border-opacity-30 ${className}`}
      onClick={handleClick}
    >
      {videoUrl ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          muted
          autoPlay
          loop
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      )}

      {isCard && date && (
        <p className="absolute top-0 right-0 bg-black bg-opacity-80 text-center text-[12px] font-medium w-10 p-2 leading-[14.4px] tracking-[1%] rounded-bl-xl z-10">
          {date}
        </p>
      )}

      <div
        className={`absolute inset-0 px-2 py-4 h-full flex flex-col justify-end bg-cardGradient ${
          isChecked ? "bg-black bg-opacity-55" : "bg-opacity-20"
        }`}
      >
        {isChecked && (
          <div className="flex items-center justify-center h-full">
            <img src={ThumbUPSVG} className="w-20 mt-20 " alt="Thumbs Up" />
          </div>
        )}
        <div className="flex">
          {titleLogo && (
            <img
              src={titleLogo}
              className="w-[21px] h-[21px] border-2 border-[#595959] border-opacity-20 border-solid rounded-full mr-[6px]"
              alt="Title Logo"
            />
          )}
          <h2
            className={`${
              isCard ? "text-body-medium" : "text-title-small mb-11"
            } font-bold leading-tight w-4/5`}
          >
            {title}
          </h2>
        </div>

        {isCard && location && (
          <p className="text-[12px] opacity-80 mb-4">{location}</p>
        )}
      </div>

      {price && (
        <>
          {isCard ? (
            <span className="absolute bottom-2 left-2 p-1 bg-white bg-opacity-20 rounded-md text-[10px] font-medium">
              {price}
            </span>
          ) : (
            <div className="absolute bottom-4 left-4 flex gap-3 overflow-hidden">
              <div className="flex animate-marqueeEventCard gap-3">
                {[...Array(2)].map((_, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 rounded-3xl">
                      <img src={CreditSVG} alt="Credit Card" />
                      <p className="text-label-small font-medium ml-2">
                        Starting from {price}
                      </p>
                    </div>
                    {date && (
                      <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 rounded-3xl">
                        <img src={CalendarSVG} alt="Calendar" />
                        <p className="text-label-small font-medium ml-2">
                          {date}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 rounded-3xl">
                      <img src={MusicSVG} alt="Music" className="h-[17px]" />
                      <p className="text-label-small font-medium ml-2">
                        {musicType}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventCard;
