import React, { useCallback, useState } from "react";
import CarouselComponent from "../../components/Carousel";
import items from "../../components/Carousel/data";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import ClockSVG from "../../../resources/svg/clock.svg";
import AddressSVG from "../../../resources/svg/address.svg";

import LikeSVG from "../../../resources/svg/favorite.svg";
import LikedSVG from "../../../resources/svg/liked.svg";
import {
  EventHeaderProps,
  LineUpProps,
  MusicGenresProps,
  IconTextProps,
  BookListProps,
  VenueProps,
} from "./type";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ArrowBack from "../../components/ArrowBack";
import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import {
  LargeDefaultButton,
  RoundedButton,
  TextOnlyButton,
} from "../../subComponents/Buttons";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import moment from "moment";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { RuleSection } from "../../__generated__/graphql";

const MUTATION_LIKE = gql(`
  mutation Like($id: String!, $like: Boolean!) {
    setLike(target: $id, like: $like) {
      handle
    }
  }
`);

const QUERY_EVENT = gql(`
  query Event($id: ID!) {
    me {
      likes {
        id
      }
    }

    event(id: $id) {
      name
      description
      musicGenres
      video
      media
      datetime
      duration
      recurrence
      tags
      accessPolicies {
        type
        minPrice
        maxPrice
        currency
        info
      }
      rules {
        title
        rules {
          icon
          text
        }
      }
      hostedAt {
        id
        name
        municipality
        postcode
        address
        country
        avatar
        description
        latitude
        longitude
      }
      hostedBy {
        id
        name
        avatar
        description
        website
      }
    }
  }
`);

const EventHeader: React.FC<EventHeaderProps> = ({
  title,
  subtitle,
  datetime,
}) => {
  const date = moment.utc(datetime).format("dddd, MMMM Do YYYY");
  const startingTime = moment.utc(datetime).format("h:mm a");

  return (
    <div className="mb-6 mt-[-10px]">
      <p className="text-[30px] font-bold">{title}</p>
      <p className="text-[18px] font-medium mt-[5px] mb-[19px]">{subtitle}</p>
      <div>
        <div className="flex items-center mb-4">
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
};

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
      className="h-24 w-24 rounded-full border border-white border-opacity-20"
      src={avatar}
    />
    <p className="text-body-small font-medium">{userName}</p>
  </div>
);

const VenueCard: React.FC<VenueProps> = ({
  imgUrl,
  coordinates,
  title,
  subTitle,
  address,
  text,
}) => (
  <>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <div className="border border-white border-opacity-20 rounded-rounded mt-6 p-3">
      <div className="flex items-center mt-[-23px]">
        <img
          src={imgUrl}
          className="h-24 w-24 rounded-full border border-white border-opacity-20"
          alt="Group"
        />
        <div className="flex flex-col ml-4">
          <p className="text-title-medium font-bold">{title}</p>
          <p className="text-label-small font-light">{subTitle}</p>
        </div>
      </div>
      <div id="map">
        <MapContainer center={[coordinates[0], coordinates[1]]} zoom={13} scrollWheelZoom={false} className="w-full h-[162px] rounded-big bg mt-2">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates[0], coordinates[1]]}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="my-4 flex">
        <img src={AddressSVG} alt="" />
        <p className="text-label-small ml-2">{address}</p>
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
      <p className="text-body-medium leading-none ml-2">{img + text}</p>
    </div>
    {dividerState && <Divider className="!border-white h-0 opacity-20" />}
  </>
);

const Rules: React.FC<{sections: RuleSection[]}> = ({sections}) => {
  return (
    <div>
      <p className="text-title-small font-semibold mt-6 mb-4">Rules</p>
      <p className="text-body-medium leading-none">
        We ask every guest who will attend the event to follow the specific
        guidelines.
      </p>
      {sections.map((section, index) => (
          <div key={index}>
            <p className="text-body-medium font-semibold mt-6 mb-1">{section.title}</p>
            {section.rules.map((rule, index) => {
              return (
                <IconText
                  key={index}
                  img={rule.icon}
                  text={rule.text}
                />
              );
            })}
          </div>
      ))}
    </div>
  );
};

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
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery(QUERY_EVENT, { variables: { id: id } });

  const container = window ? window().document.body : undefined;
  const [isBookingModal, setIsBookingModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState("booklist0");
  const [Liked, setLiked] = useState(data?.me?.likes?.some(item => id === item.id));

  const [setLikeRequest] = useMutation(MUTATION_LIKE);

  const toggleLike = () => {
    setLikeRequest({ variables: { id: id, like: !Liked } });
    setLiked((prev) => !prev);
  };


  // Using useCallback to memoize the handlers
  const handleOpen = useCallback(() => setIsBookingModal(true), []);
  const handleClose = useCallback(() => setIsBookingModal(false), []);

  // TODO: Error handling.
  if (loading || !data || !data.event) return <Loading />;
  const event = data.event

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen={true}>
        <ArrowBack />
        <img
          className="absolute right-4 top-6 z-20"
          src={Liked ? LikedSVG : LikeSVG}
          onClick={toggleLike}
        />
        <CarouselComponent items={[]} />
        <div className="p-4">
          <EventHeader title={event.name} subtitle={event.description ?? ''} datetime={event.datetime} />
          <Divider className="!border-white h-0 opacity-20" />
          <MusicGenres fields={event.musicGenres} />
          <Divider className="!border-white h-0 opacity-20" />
          <div className="mt-6">
            <p className="text-title-small font-bold mb-4">Lineup</p>
            <div className="overflow-x-auto pb-6">
              <div className="flex w-max gap-6">
                {/* TODO: Add lineup. */}
                {/* {lineUpData.map((item, index) => (
                  <LineUp key={index} {...item} />
                ))} */}
              </div>
            </div>
          </div>
          <Divider className="!border-white h-0 opacity-20" />
          <VenueCard 
            imgUrl={event.hostedAt.avatar} 
            title={event.hostedAt.name} 
            subTitle={'Venue'} 
            text={event.hostedAt.description ?? ''}
            coordinates={[event.hostedAt.latitude, event.hostedAt.longitude]}
            address={event.hostedAt.address + ', ' + event.hostedAt.postcode}
          />
          <Divider className="!border-white h-0 opacity-20" />
          {/* <Host {...hostData} /> */}
          <Rules sections={event.rules as RuleSection[]}/>
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
              height: "auto",
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
              {event.accessPolicies.map((item, index) => {
                return (
                  <BookList
                    key={"booklist" + index}
                    svg={item.type}
                    title={item.type}
                    subTitle={item.currency + item.minPrice + " - " + item.currency + item.maxPrice}
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
          <TextOnlyButton
            text="Starting from $345"
            className="!text-body-medium leading-[22px]"
          />
        </div>
        <LargeDefaultButton
          text="Book"
          className="ml-4 !rounded-[12px]"
          onClick={handleOpen}
        />
      </IonFooter>
    </IonPage>
  );
};
export default EventDetail;
