import React from "react";
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
}) => {
  const history = useHistory();
  const isCard = purpose === "card";

  const handleClick = () => {
    if (isCard) {
      history.push(`/event-view`);
    } else if (selectFunc) {
      selectFunc(cardId); // Pass cardId directly
    }
  };

  return (
    <div
      className={`relative w-full ${
        isCard ? "h-64" : "h-[55vh] mb-4"
      } rounded-2xl overflow-hidden bg-cover bg-center text-white border border-white border-opacity-30`}
      onClick={handleClick}
    >
      {videoUrl ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          // autoPlay
          loop
          muted
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      )}

      {isCard && (
        <p className="absolute top-0 right-0 bg-black bg-opacity-80 text-center text-[12px] w-10 p-2 leading-none rounded-bl-xl z-10">
          {date}
        </p>
      )}

      <div
        className={`absolute inset-0 px-2 py-4 h-full flex flex-col justify-end bg-black ${
          isChecked ? "bg-opacity-55" : "bg-opacity-20"
        }`}
      >
        {isChecked && (
          <div className="flex items-center justify-center h-full">
            <img src={ThumbUPSVG} className="w-20 mt-20" />
          </div>
        )}
        <div className="flex">
          {titleLogo && <img src={titleLogo} className="w-6 h-6" />}
          <h2
            className={`${
              isCard ? "text-body-medium" : "text-title-small mb-11"
            } font-bold leading-tight w-4/5`}
          >
            {title}
          </h2>
        </div>

        {isCard && <p className="text-[12px] opacity-80 mb-4">{location}</p>}
      </div>
      {isCard ? (
        <span className="absolute bottom-2 left-2 p-1 bg-white bg-opacity-25 rounded-md text-[10px] font-medium">
          $FROM {price}
        </span>
      ) : (
        <div className="absolute bottom-4 left-4 flex gap-3 overflow-hidden">
          <div className="flex animate-marquee gap-3">
            {[...Array(2)].map((_, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-90 rounded-3xl">
                  <img src={CreditSVG} alt="Credit Card" />
                  <p className="text-label-small font-medium ml-2">
                    Starting from ${price}
                  </p>
                </div>
                <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-90 rounded-3xl">
                  <img src={CalendarSVG} alt="Calendar" />
                  <p className="text-label-small font-medium ml-2">{date}</p>
                </div>
                <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-90 rounded-3xl">
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
    </div>
  );
};

export default EventCard;
