import React from "react";
import Wallet from "../../resources/wallet-money-cash-svgrepo-com.svg";
import Calendar from "../../resources/calendar-symbol-svgrepo-com.svg";

interface CardProps {
  imgUrl: string;
  title: string;
  payBill: number;
  date: Date;
}

const formatDate = (date: Date): string => {
  // Format the date as needed, e.g., "MM/dd/yyyy"
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const Card: React.FC<CardProps> = ({ imgUrl, title, payBill, date }) => {
  return (
    <div className="p-4 shadow-md rounded-md bg-transparent border text-white">
      <div className="mb-4">
        <img src={imgUrl} alt="payment" className="w-full h-auto rounded-md" />
      </div>
      <p className="text-xl font-semibold mb-2">{title}</p>
      <div className="bg-[#535353] px-2.5 py-1 rounded-full inline-flex items-center m-1">
        <img src={Wallet} alt="wallet icon" className="w-4 h-4 mr-2" />
        <span className="font-medium text-[12px]">
          Starting from £{payBill}
        </span>
      </div>
      <div className="bg-[#535353] px-2.5 py-1 rounded-full inline-flex items-center m-1">
        <img src={Calendar} alt="calendar icon" className="w-4 h-4 mr-2" />
        <span className="font-medium text-[12px]">{formatDate(date)}</span>
      </div>
    </div>
  );
};

export default Card;
