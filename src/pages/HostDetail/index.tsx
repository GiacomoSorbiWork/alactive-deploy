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
import { UserHeaderProps, SocialIconProps } from "./type";
import { detailData } from "./data";
import ArrowBack from "../../components/ArrowBack";
import { IonContent, IonPage } from "@ionic/react";

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

const HostDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

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
        <CarouselComponent items={items} />
        <UserHeader {...userInfo} />
        <div className="mt-0">
          <div className="flex">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleTabClick(0)}
                className={`text-body-small font-medium py-2 px-4 ${
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
                className={`text-body-small font-medium py-2 px-4 ${
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
        <div className="p-4 text-white">
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
              {/* <div className="mt-7">
                <h2 className="text-title-small font-bold mb-4">Highlights</h2>
                <div className="flex overflow-x-auto gap-4">
                  <img
                    className="w-screen h-auto object-cover rounded-md"
                    src="https://via.placeholder.com/800x600"
                    alt="Highlight"
                  />
                </div>
              </div> */}
              <div className="mt-7">
                <h2 className="text-title-small font-bold mb-4">Highlights</h2>
                <div className="flex overflow-x-auto gap-4">
                  <video
                    className="w-screen h-52 object-cover rounded-md"
                    controls
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <img
                    className="w-screen h-52 object-cover rounded-md"
                    src="https://t3.ftcdn.net/jpg/07/40/76/48/240_F_740764831_GIRbum3PNYK0bKMOGXjoOPBhnaBkWNzo.jpg"
                    alt="Highlight"
                  />
                  <img
                    className="w-screen h-52 object-cover rounded-md"
                    src="https://t3.ftcdn.net/jpg/06/75/79/98/240_F_675799899_EnRwJ46w1SrGrsS0Umt3mKoZq0g3rqmK.jpg"
                    alt="Highlight"
                  />
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

export default HostDetail;
