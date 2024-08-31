import React, { useCallback, useEffect, useRef, useState } from "react";
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

const VIDEO_URL =
  "https://s3-figma-videos-production-sig.figma.com/video/1267800981591854695/TEAM/08d0/bd09/-14c7-44ca-b923-a3436e290c96?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aMMwUnH5kfSTj56rB5Rp3RjRyLnTSo11ugDGbxe410xllYK5LNQ0wzQKhsgXmsvzU5PGvMST8QEzsxY086~pZcPYMqIkhj0UOKkCK4I1PSH6YW59FI3~OKAFxDrh7H6E5DoCgFw0Dsg4DD~ovArSwsF3JywwyzL-WNrUwfuLhwHYIDC14Y9P3RPXey0Urk1ERbR6gXLrB94JluZZqsjvqGtERIZqPS1vxPpGbQ-C4J58kgmm7qVfiUugqW5jjbPkkXDBFF~KFj1ziiZxfC1tDnJzqiz1V6gTd3cTlD-kI86GEzd9rSbGalJ0qEyxIGBn5C4B7fycA43vK-4KA2sB~A__"; // Truncated for brevity

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

  const toggleMute = () => setIsMuted((prev) => !prev);
  const toggleLike = () => setIsLiked((prev) => !prev);

  const togglePlayback = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((prev) => !prev);
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

const DashBoard: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const swipButton = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMuted, isLiked, toggleMute, toggleLike, togglePlayback } =
    useVideoControls();
  const history = useHistory();

  const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchEnd = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    const swipButtonElement = swipButton.current;
    if (swipButtonElement) {
      const deltaX = touchEnd.current.x - touchStart.current.x;
      swipButtonElement.style.transform = `translateX(${deltaX}px)`;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistanceX = Math.abs(touchEnd.current.x - touchStart.current.x);
    const swipeDistanceY = Math.abs(touchEnd.current.y - touchStart.current.y);

    if (swipeDistanceX > 50 && swipeDistanceY < 10) {
      const isSwipeLeft = touchEnd.current.x < touchStart.current.x;
      if (isSwipeLeft) {
        handleGoEventDetail();
      }
    }

    // Reset the button position after touch end
    const swipButtonElement = swipButton.current;
    if (swipButtonElement) {
      swipButtonElement.style.transform = `translateX(0)`;
    }
  }, []);

  useEffect(() => {
    const currentScrollRef = swipButton.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener("touchstart", handleTouchStart);
      currentScrollRef.addEventListener("touchmove", handleTouchMove);
      currentScrollRef.addEventListener("touchend", handleTouchEnd);

      return () => {
        currentScrollRef.removeEventListener("touchstart", handleTouchStart);
        currentScrollRef.removeEventListener("touchmove", handleTouchMove);
        currentScrollRef.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const handleGoEventDetail = () => {
    history.push("/event-detail");
  };

  return (
    <IonPage>
      <IonContent
        fullscreen={true}
        onClick={() => togglePlayback(videoRef)}
        className="relative overflow-hidden"
      >
        <video
          ref={videoRef}
          muted={isMuted}
          playsInline
          autoPlay
          className="absolute inset-0 object-cover w-full h-full"
          loop
        >
          <source src={VIDEO_URL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex items-end h-full" ref={scrollRef}>
          <div className="absolute top-7 w-full flex items-center justify-between px-4">
            <p
              className="text-[27px] font-bold cursor-pointer"
              onClick={() => history.push("host-detail")}
            >
              Tailored
            </p>
            <div className="flex gap-1">
              <img className="h-6" src={PageInfoSVG} alt="Page Info" />
            </div>
          </div>
          <button
            ref={swipButton}
            className="absolute top-[46%] flex items-center right-3 p-2 rounded-[20px] bg-black bg-opacity-30 backdrop-blur-sm border border-solid border-white border-opacity-75 animate-wiggle"
          >
            <img src={ArrowLeft} alt="Swipe for Details" />
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
            <div className="flex animate-marqueeDashboard gap-3">
              {[...Array(3)].map((_, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 backdrop-blur-[3px] rounded-3xl">
                    <img src={CreditSVG} alt="Credit Card" />
                    <p className="text-label-small font-medium ml-2">
                      Starting from $200
                    </p>
                  </div>
                  <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 backdrop-blur-[3px] rounded-3xl">
                    <img src={CalendarSVG} alt="Calendar" />
                    <p className="text-label-small font-medium ml-2">
                      09/23/2022
                    </p>
                  </div>
                  <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 backdrop-blur-[3px] rounded-3xl">
                    <img src={MusicSVG} alt="Music" className="h-[17px]" />
                    <p className="text-label-small font-medium ml-2">
                      Commercial
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <SwipeableEdgeDrawer />
        <FooterBar />
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
