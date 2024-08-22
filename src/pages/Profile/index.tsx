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

const UserHeader: React.FC<UserHeaderProps> = ({ imgUrl, name, subname }) => (
  <div className="flex items-center p-4">
    <img src={imgUrl} alt="User" className="rounded-full w-12 h-12 mr-4" />
    <div className="flex flex-col">
      <div className="flex items-center">
        <p className="text-lg font-medium mr-2 text-white">{name}</p>
        <img src={CloudCheck} alt="Verified" className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-500">{subname}</p>
    </div>
  </div>
);

const SocialIcon: React.FC<SocialIconProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center p-2">
      <img src={icon} alt="Social Icon" className="w-6" />{" "}
      {/* Added alt attribute for accessibility */}
      <span className="ml-2 font-[600]">{text}</span>
    </div>
  );
};

const Profile: React.FC = () => {
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
    <>
      <CarouselComponent items={items} />
      <UserHeader {...userInfo} />
      <div className="mt-0">
        <div className="flex">
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleTabClick(0)}
              className={`py-2 px-4 ${
                activeTab === 0
                  ? " text-[var(--primary-color)]"
                  : "text-gray-500"
              } focus:outline-none`}
            >
              Events
            </button>
            {activeTab === 0 && (
              <span className="w-12 h-[2px] bg-[var(--primary-color)]"></span>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleTabClick(1)}
              className={`py-2 px-4 ${
                activeTab === 1
                  ? " text-[var(--primary-color)]"
                  : "text-gray-500"
              } focus:outline-none`}
            >
              About
            </button>
            {activeTab === 1 && (
              <span className="w-12 h-[2px] bg-[var(--primary-color)]"></span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 text-white">
        {activeTab === 0 && (
          <div>
            <h2 className="text-[22px] font-[600] mb-3">Hosting Events</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <EventCard
                imgUrl="https://t4.ftcdn.net/jpg/08/19/24/63/240_F_819246328_2nfWzjhKYjhnl1yURFR0NL1oToq8FDnn.jpg"
                title="Sample Event 1"
                date="2 Jun"
                location="New York, NY"
                price="FROM $200"
              />
              <EventCard
                imgUrl="https://t3.ftcdn.net/jpg/07/40/76/48/240_F_740764831_GIRbum3PNYK0bKMOGXjoOPBhnaBkWNzo.jpg"
                title="Sample Event 2"
                date="23 Aug"
                location="Los Angeles, CA"
                price="FROM $75"
              />
              <EventCard
                imgUrl="https://t4.ftcdn.net/jpg/07/90/04/33/240_F_790043387_sjkrr01wF935RYQzWHsqePxZ1SDantUJ.jpg"
                title="Sample Event 1"
                date="12 Oct"
                location="New York, NY"
                price="FROM $200"
              />
              <EventCard
                imgUrl="https://t3.ftcdn.net/jpg/06/75/79/98/240_F_675799899_EnRwJ46w1SrGrsS0Umt3mKoZq0g3rqmK.jpg"
                title="6 Mar"
                date="19 Nov"
                location="Los Angeles, CA"
                price="FROM $75"
              />
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <>
            <div>
              <h2 className="text-[22px] font-[600] mb-3">Address</h2>
              <p className="text-[14px] mb-1">
                Bond street, 22, GU75HP, London, United Kingdom
              </p>
              <img src="https://img.freepik.com/premium-vector/3d-top-view-map-with-destination-location-point_34645-1177.jpg?w=1380"></img>
            </div>

            <div className="mt-5">
              <h2 className="text-[22px] font-[600] mb-3">Information</h2>
              <p className="text-[14px] mb-1">
                {"The most technologically advanced club on the planet with" +
                  "cutting-edge DJs and pioneering immersive experiences." +
                  "Officially the World's Number 1 Club."}
              </p>
            </div>
            <SocialIcon icon={SpotifySVG} text="Spotify" />
            <SocialIcon icon={YouTubeSVG} text="You Tude" />
            <SocialIcon icon={LinkdinSVG} text="Linkdin" />
            <SocialIcon icon={InstagamSVG} text="Instagam" />
            <SocialIcon icon={LineSVG} text="stefanooffical.com" />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
