import React from "react";
import { useHistory } from "react-router-dom";
import { EventCardProps } from "./type";
import CreditSVG from "../../../resources/svg/rules/credit_card_off.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";

const EventCard: React.FC<EventCardProps> = ({
  imgUrl,
  cardId,
  title,
  date,
  location,
  price,
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
        isCard ? "h-64" : "h-[554px]"
      } rounded-md overflow-hidden bg-cover bg-center text-white`}
      style={{ backgroundImage: `url(${imgUrl})` }}
      onClick={handleClick}
    >
      {isCard && (
        <p className="absolute top-0 right-0 bg-secondaryContainer text-center text-[12px] w-9 p-1 leading-none rounded-bl-xl z-10">
          {date}
        </p>
      )}
      <div
        className={`absolute inset-0 p-4 h-full flex flex-col justify-end ${
          isChecked ? "bg-blue-700 bg-opacity-75" : "bg-black bg-opacity-20"
        }`}
      >
        <h2
          className={`${
            isCard ? "text-body-medium" : "text-title-small mb-9"
          } font-bold leading-tight w-4/5`}
        >
          {title}
        </h2>
        {isCard && <p className="text-[12px] opacity-80 mb-4">{location}</p>}
      </div>
      {isCard ? (
        <span className="absolute bottom-2 left-4 p-1 bg-secondaryContainer rounded-md text-[10px] font-medium">
          $FROM {price}
        </span>
      ) : (
        <div className="absolute bottom-2 left-2 flex gap-3">
          <div className="flex items-center p-2 bg-secondaryContainer bg-opacity-90 rounded-3xl">
            <img src={CreditSVG} alt="Credit Card" />
            <p className="text-label-small font-medium ml-2">
              Starting from ${price}
            </p>
          </div>
          <div className="flex items-center p-2 bg-secondaryContainer bg-opacity-90 rounded-3xl">
            <img src={CalendarSVG} alt="Calendar" />
            <p className="text-label-small font-medium ml-2">{date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
