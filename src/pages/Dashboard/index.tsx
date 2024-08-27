import React, { useRef, useState } from "react";
import SwipeableEdgeDrawer from "../../components/SwipeableEdgeDrawer";
import HostAvatarSVG from "../../../resources/svg/Host Avatar.svg";
import FavoriteSVG from "../../../resources/svg/favorite.svg";
import LikedSVG from "../../../resources/svg/liked.svg";
import MuteSVG from "../../../resources/svg/Speaker.svg";
import UnmuteSVG from "../../../resources/svg/mute.svg";
import CreditSVG from "../../../resources/svg/solar_wallet-linear.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import PageInfoSVG from "../../../resources/svg/page_info.svg";
import ArrowLeft from "../../../resources/svg/Left Arrow.svg";
import MusicSVG from "../../../resources/svg/musical-note-music-svgrepo-com.svg";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import FooterBar from "../../components/FooterBar";
import { IconButtonProps } from "./type";

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick }) => (
  <button
    className="flex flex-col items-center m-2 cursor-pointer"
    onClick={onClick}
    aria-label={label}
  >
    <img
      src={icon}
      className={`${
        ["Like", "Liked", "Mute", "Unmute"].includes(label) ? "w-8" : "h-10"
      }`}
      alt={label}
    />
    <p className="text-body-small">{label}</p>
  </button>
);

const useVideoControls = (initialState = { muted: false, liked: false }) => {
  const [isMuted, setIsMuted] = useState(initialState.muted);
  const [isLiked, setIsLiked] = useState(initialState.liked);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleLike = () => setIsLiked(!isLiked);
  const togglePlayback = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return {
    isMuted,
    isLiked,
    isPlaying,
    toggleMute,
    toggleLike,
    togglePlayback,
  };
};

const VIDEO_URL =
  "https://s3-figma-videos-production-sig.figma.com/video/1267800981591854695/TEAM/08d0/bd09/-14c7-44ca-b923-a3436e290c96?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aMMwUnH5kfSTj56rB5Rp3RjRyLnTSo11ugDGbxe410xllYK5LNQ0wzQKhsgXmsvzU5PGvMST8QEzsxY086~pZcPYMqIkhj0UOKkCK4I1PSH6YW59FI3~OKAFxDrh7H6E5DoCgFw0Dsg4DD~ovArSwsF3JywwyzL-WNrUwfuLhwHYIDC14Y9P3RPXey0Urk1ERbR6gXLrB94JluZZqsjvqGtERIZqPS1vxPpGbQ-C4J58kgmm7qVfiUugqW5jjbPkkXDBFF~KFj1ziiZxfC1tDnJzqiz1V6gTd3cTlD-kI86GEzd9rSbGalJ0qEyxIGBn5C4B7fycA43vK-4KA2sB~A__";

const DashBoard: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMuted, isLiked, toggleMute, toggleLike, togglePlayback } =
    useVideoControls();
  const history = useHistory();

  const handleGoEventDetail = () => {
    history.push("/event-detail");
  };

  return (
    <IonPage>
      <IonContent fullscreen={true} onClick={() => togglePlayback(videoRef)}>
        <video
          ref={videoRef}
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_URL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 h-full flex items-end">
          <div className="absolute top-10 w-full flex justify-between px-4">
            <p className="text-title-small font-bold">Tailored</p>
            <img src={PageInfoSVG} alt="Page Info" />
          </div>
          <button
            className="absolute top-[46%] flex items-center right-3 p-2 rounded-rounded bg-black bg-opacity-30 backdrop-blur-sm border border-solid border-white border-opacity-75"
            onClick={handleGoEventDetail}
          >
            <img src={ArrowLeft} alt="Credit Card" />
            <p className="text-body-small font-semibold leading-[17px]">
              Swipe for Details
            </p>
          </button>
          <div className="flex flex-col items-center w-max ml-auto mb-20">
            <IconButton
              icon={HostAvatarSVG}
              label="Circoloco"
              onClick={() => history.push("/host-detail")}
            />
            <IconButton
              icon={isLiked ? LikedSVG : FavoriteSVG}
              label={isLiked ? "Liked" : "Like"}
              onClick={toggleLike}
            />
            <IconButton
              icon={isMuted ? UnmuteSVG : MuteSVG}
              label={isMuted ? "Unmute" : "Mute"}
              onClick={toggleMute}
            />
          </div>
        </div>
        <div className="absolute bottom-[90px] left-4">
          <p className="text-title-small font-bold my-2">Week 15 Ibiza</p>
          <div className="overflow-hidden w-[75vw]">
            <div className="flex animate-marquee gap-3">
              {[...Array(3)].map((_, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-90 rounded-3xl">
                    <img src={CreditSVG} alt="Credit Card" />
                    <p className="text-label-small font-medium ml-2">
                      Starting from $200
                    </p>
                  </div>
                  <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-90 rounded-3xl">
                    <img src={CalendarSVG} alt="Calendar" />
                    <p className="text-label-small font-medium ml-2">
                      09/23/2022
                    </p>
                  </div>
                  <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-90 rounded-3xl">
                    <img src={MusicSVG} alt="Music" className="h-[17px]" />
                    <p className="text-label-small font-medium ml-2">
                      Commerical
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <SwipeableEdgeDrawer />
        <FooterBar></FooterBar>
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
