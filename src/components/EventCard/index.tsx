import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { EventCardProps } from "./type";
import CreditSVG from "../../../resources/svg/solar_wallet-linear.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import ThumbUPSVG from "../../../resources/svg/thumbvector.svg";
import MusicSVG from "../../../resources/svg/musical-note-music-svgrepo-com.svg";
import playM3u8 from "../../util/playM3u8";
import { RRule } from 'rrule';

const dayMapping: { [key: number]: string } = {
  0: 'Next Mon', // Monday
  1: 'Next Tue', // Tuesday
  2: 'Next Wen', // Wednesday
  3: 'Next Thu', // Thursday
  4: 'Next Fry', // Friday
  5: 'Next Sat', // Saturday
  6: "Next Sun", // Sunday
};

const getRecurrentDay = (rruleString: string) => {
  try {
    const rule = RRule.fromString(rruleString);

    // Extract the first (and only) day from the RRULE and return its abbreviation
    const weekday = rule.options.byweekday[0]; // Get the first weekday

    return weekday ? dayMapping[weekday] : null; 
  } catch (error) {
    console.error('Error parsing RRULE:', error);
    return null;
  }
};

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

  const isRRule = date && date.startsWith('FREQ=WEEKLY');
  const displayedDate = isRRule ? getRecurrentDay(date) : date;

  const handleClick = () => {
    if (selectFunc) {
      selectFunc(cardId);
    } else {
      // history.push(`/${nextURL}`);
      history.push(nextURL);
    }
  };

  // Handle video playback based on visibility
  useEffect(() => {
    if (videoUrl && videoRef.current) playM3u8(videoUrl, videoRef.current);
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
					controls={false}
          playsInline
          webkit-playsinline
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      )}

      {isCard && displayedDate && (
        <p className="absolute top-0 right-0 bg-black bg-opacity-80 text-center text-[12px] font-medium w-12 p-2 leading-[14.4px] tracking-[1%] rounded-bl-xl z-10">
          {displayedDate}
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

        {isCard && (
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

const FakeEventCard: React.FC<{ isCard?: boolean }> = ({ isCard = true }) => {
  return (
    <div
      className={`relative w-full snap-start ${
        isCard ? "mb-4 aspect-[190/300]" : "mb-3 aspect-[364/554]"
      } rounded-xl overflow-hidden bg-cover bg-center text-white border border-white border-opacity-30 animate-pulse`}
    >
      {/* Placeholder for video or image */}
      <div className="absolute inset-0 w-full h-full bg-gray-300" />

      {/* Placeholder for date badge */}
      {isCard && (
        <div className="absolute top-0 right-0 bg-gray-500 bg-opacity-50 w-10 h-8 rounded-bl-xl"></div>
      )}

      {/* Placeholder for content */}
      <div
        className={`absolute inset-0 px-2 py-4 h-full flex flex-col justify-end bg-gray-700 bg-opacity-50`}
      >
        {/* Placeholder for title */}
        <div className="w-3/5 h-6 bg-gray-500 mb-2 rounded-sm"></div>

        {/* Placeholder for location */}
        {isCard && <div className="w-2/5 h-4 bg-gray-400 rounded-sm"></div>}
      </div>

      {/* Placeholder for price */}
      {isCard ? (
        <span className="absolute bottom-2 left-2 w-16 h-4 bg-gray-500 rounded-md"></span>
      ) : (
        <div className="absolute bottom-4 left-4 flex gap-3">
          <div className="flex gap-3">
            <div className="w-32 h-6 bg-gray-500 rounded-3xl"></div>
            <div className="w-32 h-6 bg-gray-500 rounded-3xl"></div>
            <div className="w-32 h-6 bg-gray-500 rounded-3xl"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
