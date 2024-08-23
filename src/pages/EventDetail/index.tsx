import React from "react";
import CarouselComponent from "../../components/Carousel";
import items from "../../components/Carousel/data";
import CloudCheckSVG from "../../../resources/svg/artist.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import ClockSVG from "../../../resources/svg/clock.svg";
import AddressSVG from "../../../resources/svg/address.svg";
import UnCheckSVG from "../../../resources/svg/octagon.svg";

import {
  EventHeaderProps,
  HostProps,
  IntroduceGroupProps,
  LineUpProps,
  MusicGenresProps,
} from "./type";
import Divider from "@mui/material/Divider";
import { hostData, introData, lineUpData } from "./data";

const EventHeader: React.FC<EventHeaderProps> = ({
  title,
  subtitle,
  date,
  startingTime,
}) => (
  <div className="my-6">
    <p className="text-title-medium font-bold">{title}</p>
    <p className="text-body-large font-medium my-[19px]">{subtitle}</p>
    <div>
      <div className="flex items-center mb-[16px]">
        <img src={CalendarSVG} alt="" />
        <p className="text-body-small font-medium ml-2">{date}</p>
      </div>
      <div className="flex items-center">
        <img src={ClockSVG} alt="" />
        <p className="text-body-small font-medium ml-2">
          Starting from {startingTime}
        </p>
      </div>
    </div>
  </div>
);

const MusicGenres: React.FC<MusicGenresProps> = ({ fields }) => (
  <div className="my-6">
    <p className="text-title-small font-bold mb-4">Music Genres</p>
    <div className="flex flex-wrap gap-small">
      {fields.map((genre: string, index: number) => (
        <div
          key={index}
          className="p-2 rounded-rounded bg-white bg-opacity-10 text-body-small"
        >
          {genre}
        </div>
      ))}
    </div>
  </div>
);

const LineUp: React.FC<LineUpProps> = ({ avatar, userName }) => (
  <div className="flex flex-col items-center">
    <img
      className="h-24 w-24 rounded-full border border-white border-opacity-20 p-px"
      src={avatar}
    />
    <p className="text-body-small font-medium">{userName}</p>
  </div>
);

const IntroduceGroup: React.FC<IntroduceGroupProps> = ({
  imgUrl,
  mapUrl,
  title,
  subTitle,
  address,
  parkingAvailable = false,
  text,
}) => (
  <>
    <div className="border border-white border-opacity-20 rounded-rounded mt-6 p-3">
      <div className="flex items-center mt-[-23px]">
        <img
          src={imgUrl}
          className="h-24 w-24 rounded-full border border-white border-opacity-20 p-px"
          alt="Group"
        />
        <div className="flex flex-col ml-4">
          <p className="text-title-medium font-bold">{title}</p>
          <p className="text-label-small font-light">{subTitle}</p>
        </div>
      </div>
      <div
        className="w-full h-[162px] rounded-big bg mt-2"
        style={{
          backgroundImage: `url(${mapUrl})`,
          backgroundPosition: "center",
        }}
      ></div>
      <div className="my-4 flex">
        <img src={AddressSVG} alt="" />
        <p className="text-label-small ml-2">{address}</p>
      </div>
      <div className="flex">
        {parkingAvailable && <img src={UnCheckSVG} alt="" />}
        <p className="text-label-small ml-2">Parking Available</p>
      </div>
    </div>
    <p className="text-label-small font-medium mt-4 mb-6">{text}</p>
  </>
);

const Host: React.FC<HostProps> = ({ imgUrl, title, subTitle, text }) => (
  <>
    <div className="border border-white border-opacity-20 rounded-rounded mt-6 p-3 h-[242px]">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative">
          <img
            src={imgUrl}
            className="h-24 w-24 rounded-full border border-white border-opacity-20 p-px"
            alt="Group"
          />
          <img
            className="h-9 w-9 bg-primaryContainer rounded-full p-1 absolute top-14 left-16"
            src={CloudCheckSVG}
          />
        </div>
        <p className="text-title-medium font-bold">{title}</p>
        <p className="text-label-small font-light">{subTitle}</p>
      </div>
    </div>
    <p className="text-label-small font-medium mt-4 mb-6">{text}</p>
  </>
);

const EventDetail: React.FC = () => {
  const eventInfo = {
    title: "House Rave",
    subtitle: "Pou up event in Mayfair",
    date: "12/03/2024",
    startingTime: "22:00",
  };

  return (
    <>
      <CarouselComponent items={items} />
      <div className="p-4">
        <EventHeader {...eventInfo}></EventHeader>
        <Divider className="!border-white h-0 opacity-20" />
        <MusicGenres
          fields={[
            "Tech house",
            "Afro house",
            "Deep house",
            "Downtempo",
            "Organic House",
          ]}
        />
        <Divider className="!border-white h-0 opacity-20" />
        <div className="mt-6">
          <p className="text-title-small font-bold mb-4">Lineup</p>
          <div className="overflow-x-auto pb-6">
            <div className="flex w-max gap-6">
              {lineUpData.map((item, index) => (
                <LineUp key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
        <Divider className="!border-white h-0 opacity-20" />
        {introData.map((item, index) => (
          <IntroduceGroup key={index} {...item} />
        ))}
        <Divider className="!border-white h-0 opacity-20" />
        <Host {...hostData}></Host>
      </div>
    </>
  );
};

export default EventDetail;
