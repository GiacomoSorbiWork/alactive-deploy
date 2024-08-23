import React from "react";
import { EventCardProps } from "./type";

const EventCard: React.FC<EventCardProps> = ({
  imgUrl,
  title,
  date,
  location,
  price,
}) => {
  return (
    <div
      className="relative w-full max-w-sm h-64 rounded-md overflow-hidden bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className="flex justify-end">
        <p className="text-[12px] w-9 bg-secondaryContainer text-center leading-none rounded-bl-xl p-1 z-10">
          {date}
        </p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-20 p-4 flex flex-col justify-end mb-4">
        <h2 className="text-body-medium font-bold">{title}</h2>
        <p className="text-[12px] text-opacity-75">{location}</p>
      </div>
      <span className="absolute bottom-0 p-1 mb-2 bg-secondaryContainer rounded-md left-4 text-[10px] font-medium leading-none">
        {price}
      </span>
    </div>
  );
};

export default EventCard;
