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
        <p className="text-sm w-10 text-center leading-none bg-gray-600 rounded-bl-xl p-1 z-10">
          {date}
        </p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-20 p-4 flex flex-col justify-end mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{location}</p>
      </div>
      <span className="absolute bottom-0 p-[4px] mb-2 bg-[grey] rounded-md left-4 text-[12px] leading-none">
        {price}
      </span>
    </div>
  );
};

export default EventCard;
