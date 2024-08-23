import React, { useState } from "react";
import SwipeableEdgeDrawer from "../../components/SwipeableEdgeDrawer";
import HostAvatarSVG from "../../../resources/svg/Host Avatar.svg";
import FavoriteSVG from "../../../resources/svg/favorite.svg";
import LikedSVG from "../../../resources/svg/liked.svg";
import MuteSVG from "../../../resources/svg/Speaker.svg";
import UnmuteSVG from "../../../resources/svg/mute.svg";
import CreditSVG from "../../../resources/svg/rules/credit_card_off.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import PageInfoSVG from "../../../resources/svg/page_info.svg";

interface IconTextProps {
  svg: string;
  text: string;
  onClick?: () => void;
}

const IconText: React.FC<IconTextProps> = ({ svg, text, onClick }) => (
  <div
    className="flex flex-col items-center m-2 cursor-pointer"
    onClick={onClick}
  >
    <img src={svg} className="h-6" alt={text} />
    <p className="text-body-small">{text}</p>
  </div>
);

const DashBoard: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleLike = () => setIsLike(!isLike);

  const videoUrl =
    "https://s3-figma-videos-production-sig.figma.com/video/1267800981591854695/TEAM/08d0/bd09/-14c7-44ca-b923-a3436e290c96?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aMMwUnH5kfSTj56rB5Rp3RjRyLnTSo11ugDGbxe410xllYK5LNQ0wzQKhsgXmsvzU5PGvMST8QEzsxY086~pZcPYMqIkhj0UOKkCK4I1PSH6YW59FI3~OKAFxDrh7H6E5DoCgFw0Dsg4DD~ovArSwsF3JywwyzL-WNrUwfuLhwHYIDC14Y9P3RPXey0Urk1ERbR6gXLrB94JluZZqsjvqGtERIZqPS1vxPpGbQ-C4J58kgmm7qVfiUugqW5jjbPkkXDBFF~KFj1ziiZxfC1tDnJzqiz1V6gTd3cTlD-kI86GEzd9rSbGalJ0qEyxIGBn5C4B7fycA43vK-4KA2sB~A__";

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 h-full flex items-end">
          <div className="absolute top-3 w-full flex justify-between p-4">
            <p className="text-title-small font-bold">Tailored</p>
            <img src={PageInfoSVG} className="" />
          </div>
          <div className="flex flex-col items-center w-max ml-auto mb-20">
            <IconText svg={HostAvatarSVG} text="Circoloco" />
            <IconText
              svg={isLike ? LikedSVG : FavoriteSVG}
              text={isLike ? "Liked" : "Like"}
              onClick={toggleLike}
            />
            <IconText
              svg={isMuted ? UnmuteSVG : MuteSVG}
              text={isMuted ? "Unmute" : "Mute"}
              onClick={toggleMute}
            />
          </div>
        </div>
        <div className="absolute bottom-[90px] left-4">
          <p className="text-title-small font-bold my-2">Week 15 Ibiza</p>
          <div className="flex gap-3">
            <div className="flex items-center p-2 bg-secondaryContainer bg-opacity-50 rounded-3xl">
              <img src={CreditSVG} alt="" />
              <p className="text-label-small ml-2">Starting from $27</p>
            </div>
            <div className="flex items-center p-2 bg-secondaryContainer bg-opacity-50 rounded-3xl">
              <img src={CalendarSVG} alt="" />
              <p className="text-label-small ml-2">29/08/2024</p>
            </div>
          </div>
        </div>
      </div>

      <SwipeableEdgeDrawer />
    </>
  );
};

export default DashBoard;
