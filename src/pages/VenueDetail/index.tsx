import React, { useState } from "react";
import CarouselComponent from "../../components/Carousel";
import items from "../../components/Carousel/data";
import CloudCheck from "../../../resources/svg/artist.svg";
import UserAvatar from "../../../resources/avatar/Basic_Ui_(186).jpg";
import EventCard from "../../components/EventCard";
import SpotifySVG from "../../../resources/svg/social/spotify-white-icon.svg";
import YouTubeSVG from "../../../resources/svg/social/youtube-app-white-icon.svg";
import InstagamSVG from "../../../resources/svg/social/instagram-white-icon.svg";
import LinkdinSVG from "../../../resources/svg/social/linkedin-app-white-icon.svg";
import LineSVG from "../../../resources/svg/social/link-svgrepo-com.svg";
import LikeSVG from "../../../resources/svg/favorite.svg";
import LikedSVG from "../../../resources/svg/liked.svg";
import { UserHeaderProps, SocialIconProps } from "./type";
import { detailData } from "./data";
import ArrowBack from "../../components/ArrowBack";
import { IonContent, IonPage } from "@ionic/react";
import { RoundedButton } from "../../subComponents/Buttons";
import { useHistory, useParams } from "react-router";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "../../components/Loading";

const QUERY_VENUE = gql(`
 query Venue($id: ID!) {
     me {
      likes{
         id
      }
    }
    venue($id: ID!) {
      name
      country
      municipality
      postcode
      address
      avatar
      description
      media
      highlights{
        title
        cover
        videos
      }
      hosting{
        name
        media
        datetime
        accessPolicies{
          minPrice
          currency
        }
      }
    }
	}
`);

const UserHeader: React.FC<UserHeaderProps> = ({ imgUrl, name, subname }) => (
  <div className="flex items-center p-4">
    <img src={imgUrl} alt="User" className="rounded-full w-14 h-14 mr-4" />
    <div className="flex flex-col">
      <div className="flex items-center">
        <p className="text-title-small font-bold mr-2 text-white">{name}</p>
        <img src={CloudCheck} alt="Verified" className="w-5 h-5" />
      </div>
      <p className="text-label-small text-white text-opacity-65">{subname}</p>
    </div>
  </div>
);

const SocialIcon: React.FC<SocialIconProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center p-2">
      <img src={icon} alt="Social Icon" className="w-6" />
      <span className="ml-2 text-body-small font-bold">{text}</span>
    </div>
  );
};

const VenueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery(QUERY_VENUE, { variables: { id: id } });
  console.log(data);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [Liked, setLiked] = useState(false);
  const history = useHistory();
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const userInfo = {
    imgUrl: UserAvatar,
    name: "Circoloco",
    subname: "@hi_ibiza",
  };

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <ArrowBack />
        <img
          className="absolute right-4 top-6 z-20"
          src={Liked ? LikedSVG : LikeSVG}
          onClick={() => setLiked((prev) => !prev)}
        />
        <CarouselComponent items={items} />
        <UserHeader {...userInfo} />
        <div className="mt-0">
          <div className="flex">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleTabClick(0)}
                className={`text-body-small font-medium px-4 ${
                  activeTab === 0
                    ? " text-activeButton"
                    : "text-white text-opacity-65"
                } focus:outline-none`}
              >
                Events
              </button>
              {activeTab === 0 && (
                <span className="w-12 h-[2px] bg-[var(--secondary-color)]"></span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleTabClick(1)}
                className={`text-body-small font-medium px-4 ${
                  activeTab === 1
                    ? "text-activeButton"
                    : "text-white text-opacity-65"
                } focus:outline-none`}
              >
                About
              </button>
              {activeTab === 1 && (
                <span className="w-12 h-[2px] bg-activeButton"></span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 text-white">
          {activeTab === 0 && (
            <>
              <div>
                <h2 className="text-title-small font-bold mb-4">
                  Hosting Events
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {detailData.map((event, index) => (
                    <EventCard {...event} key={index} />
                  ))}
                </div>
              </div>
              {detailData.length >= 6 && (
                <div className="flex justify-center p-4">
                  <RoundedButton onClick={() => history.push("host-events")} />
                </div>
              )}
              {/* <div className="mt-7">
                <h2 className="text-title-small font-bold mb-4">Highlights</h2>
                <div className="flex overflow-x-auto gap-4">
                  <img
                    className="w-screen h-auto object-cover rounded-md"
                    src="https://via.placeholder.com/800x600"
                    alt="Highlight"
                  />
                  <img
                    className="w-screen h-auto object-cover rounded-md"
                    src="https://via.placeholder.com/800x600"
                    alt="Highlight"
                  />
                  <EventCard
                    title={event.title}
                    imgUrl={event.imgUrl}
                    nextURL="event-view"
                  />
                </div>
              </div> */}
              <div className="mt-2">
                <h2 className="text-title-small font-bold mb-4">Highlights</h2>
                <div className="overflow-x-auto w-full">
                  <div className="flex w-max gap-4 ">
                    {detailData.map((event, index) => (
                      <div key={index}>
                        <EventCard
                          title={event.title}
                          imgUrl={event.imgUrl}
                          nextURL="event-view"
                          className="!w-[44.3vw]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === 1 && (
            <>
              <div>
                <h2 className="text-title-small font-bold mb-4">Address</h2>
                <p className="text-label-small mb-4">
                  Bond street, 22, GU75HP, London, United Kingdom
                </p>
                <img
                  className="rounded-md"
                  src="https://img.freepik.com/premium-vector/3d-top-view-map-with-destination-location-point_34645-1177.jpg?w=1380"
                ></img>
              </div>

              <div className="mt-5">
                <h2 className="text-title-small font-semibold mb-3">
                  Information
                </h2>
                <p className="text-body-small font-medium mb-1">
                  {"The most technologically advanced club on the planet with" +
                    "cutting-edge DJs and pioneering immersive experiences." +
                    "Officially the World's Number 1 Club."}
                </p>
              </div>
              <SocialIcon icon={SpotifySVG} text="Spotify" />
              <SocialIcon icon={YouTubeSVG} text="YouTube" />
              <SocialIcon icon={LinkdinSVG} text="LinkedIn" />
              <SocialIcon icon={InstagamSVG} text="Instagram" />
              <SocialIcon icon={LineSVG} text="stefanooffical.com" />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VenueDetail;
