import React, { useCallback, useState } from "react";
import CarouselComponent from "../../components/Carousel";
import items from "../../components/Carousel/data";
import CloudCheckSVG from "../../../resources/svg/artist.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import ClockSVG from "../../../resources/svg/clock.svg";
import AddressSVG from "../../../resources/svg/address.svg";
import UnCheckSVG from "../../../resources/svg/octagon.svg";

import PersonManSVG from "../../../resources/svg/rules/person-man.svg";
import CreditSVG from "../../../resources/svg/rules/credit_card_off.svg";
import MoneySVG from "../../../resources/svg/rules/money_off.svg";
import ContextualSVG from "../../../resources/svg/rules/contextual_token.svg";
import PhotographySVG from "../../../resources/svg/rules/no_photography.svg";
import SmokeSVG from "../../../resources/svg/rules/smoke_free.svg";
import FrameSVG from "../../../resources/svg/rules/Frame.svg";

import {
  EventHeaderProps,
  HostProps,
  IntroduceGroupProps,
  LineUpProps,
  MusicGenresProps,
  IconTextProps,
  BookListProps,
} from "./type";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { hostData, introData, lineUpData, booklist } from "./data";
import ArrowBack from "../../components/ArrowBack";
import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import {
  LargeDefaultButton,
  TextOnlyButton,
} from "../../subComponents/Buttons";

const EventHeader: React.FC<EventHeaderProps> = ({
  title,
  subtitle,
  date,
  startingTime,
}) => (
  <div className="mb-6 mt-[-16px]">
    <p className="text-[30px] font-bold">{title}</p>
    <p className="text-[18px] font-medium my-[19px]">{subtitle}</p>
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

const IconText: React.FC<IconTextProps> = ({
  img,
  text,
  dividerState = true,
}) => (
  <>
    <div className="flex py-[20px] items-center">
      <img src={img} alt="" />
      <p className="text-body-medium leading-none ml-2">{text}</p>
    </div>
    {dividerState && <Divider className="!border-white h-0 opacity-20" />}
  </>
);

const Rules = () => (
  <div>
    <p className="text-title-small font-semibold mt-6 mb-4">Rules</p>
    <p className="text-body-medium leading-none">
      We ask every guest who will attend the event to follow the specific
      guidelines.
    </p>
    <p className="text-body-medium font-semibold my-6">The Essentials</p>
    <IconText
      img={FrameSVG}
      text={
        "Smart/casual: Dress / Dark jeans or chinos, button-down shirts, casual loafers, polos or clean sneakers"
      }
      dividerState={false}
    />
    <p className="text-body-medium font-semibold my-6">More on rules</p>
    <Divider className="!border-white h-0 opacity-20" />
    <IconText img={PersonManSVG} text={"Minimum age 21"} />
    <IconText img={SmokeSVG} text={"Prohibited to smoke"} />
    <IconText img={PhotographySVG} text={"Prohibited to make pictures"} />
    <IconText img={ContextualSVG} text={"Id’s required"} />
    <IconText img={MoneySVG} text={"The venue doesn’t accept cash"} />
    <IconText img={CreditSVG} text={"The venue doesn’t accept credit cards"} />
  </div>
);

const BookList: React.FC<BookListProps> = ({
  svg,
  title,
  subTitle,
  className,
  onClick,
}) => {
  return (
    <div
      className={`flex my-1 items-center p-1 ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-[74px] w-[74px] bg-white bg-opacity-10 rounded-2xl">
        <img src={svg} />
      </div>
      <div className="flex flex-col ml-2">
        <p className="text-body-large font-bold">{title}</p>
        <p>{subTitle}</p>
      </div>
    </div>
  );
};

const EventDetail: React.FC<{ window?: () => Window }> = ({ window }) => {
  const eventInfo = {
    title: "House Rave",
    subtitle: "Pop-up event in Mayfair",
    date: "12/03/2024",
    startingTime: "22:00",
  };

  const container = window ? window().document.body : undefined;
  const [isBookingModal, setIsBookingModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState("booklist0");

  // Using useCallback to memoize the handlers
  const handleOpen = useCallback(() => setIsBookingModal(true), []);
  const handleClose = useCallback(() => setIsBookingModal(false), []);

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen={true}>
        <ArrowBack />
        <CarouselComponent items={items} />
        <div className="p-4">
          <EventHeader {...eventInfo} />
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
          <Host {...hostData} />
          <Divider className="!border-white h-0 opacity-20" />
          <Rules />
        </div>

        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={isBookingModal}
          onClose={handleClose}
          onOpen={handleOpen}
          disableSwipeToOpen={false}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiPaper-root": {
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
              border: 0,
            },
            "& .MuiBackdrop-root": {
              backdropFilter: "blur(2px)",
            },
          }}
        >
          <div className="h-2 w-14 bg-white bg-opacity-50 absolute top-4 left-[calc(50%-25px)] rounded-xl" />
          <div className="bg-filterContainer p-4 text-white flex flex-col">
            <Divider className="!border-white h-0 opacity-20 !mt-6" />
            <div className="py-1">
              {booklist.map((item, index) => {
                return (
                  <BookList
                    key={"booklist" + index}
                    svg={item.svg}
                    title={item.title}
                    subTitle={item.subTitle}
                    className={
                      selectedBook === "booklist" + index
                        ? "bg-white bg-opacity-10 rounded-[20px]"
                        : ""
                    }
                    onClick={() => setSelectedBook("booklist" + index)}
                  ></BookList>
                );
              })}
            </div>
            <LargeDefaultButton
              text="Book"
              onClick={handleClose}
              className="rounded-[12px]"
            ></LargeDefaultButton>
          </div>
        </SwipeableDrawer>
      </IonContent>
      <IonFooter className="bg-primaryContainer p-4 items-center grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <TextOnlyButton text="Starting from $345" />
        </div>
        <LargeDefaultButton text="Book" className="ml-4" onClick={handleOpen} />
      </IonFooter>
    </IonPage>
  );
};
export default EventDetail;
