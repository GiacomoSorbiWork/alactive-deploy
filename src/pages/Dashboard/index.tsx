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
import EventDetail from "../EventDetail";

const VIDEO_URLS = [
  "https://s3-figma-videos-production-sig.figma.com/video/1267800981591854695/TEAM/08d0/bd09/-14c7-44ca-b923-a3436e290c96?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f~VpWPyTh5TkQJeyCAycqBOeXvayjoav3qxK3bvYeWdnGldzoPlwCL4zCSBg~ae37F7rM8Wy1~qlOx01OBiG92sgUUXHt8tf-4RfPconpofslsToUbATBJ8-KQgSH4rjG51z1qFIdrKNCXe7WY2kPtYbfqyZsMxrjLercqP7tALZvEib6zaZTQDw-QJ0TbCN5v0nndtO2K-3KDE6OpmS6PmH3f6ekb9KepYJ54nYS3kuJrxEYplm4nWIgykmYTcaQnR2ZKHpHck-SArSh0VHdMMSXZTEkuwSmqpyTXkGjMSz~NdML-fEsPJnSSDoOF2bGD7X6fpDwHg05hkcJaHuHQ__",
  "https://s3-figma-videos-production-sig.figma.com/video/1267800981591854695/TEAM/08d0/bd09/-14c7-44ca-b923-a3436e290c96?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f~VpWPyTh5TkQJeyCAycqBOeXvayjoav3qxK3bvYeWdnGldzoPlwCL4zCSBg~ae37F7rM8Wy1~qlOx01OBiG92sgUUXHt8tf-4RfPconpofslsToUbATBJ8-KQgSH4rjG51z1qFIdrKNCXe7WY2kPtYbfqyZsMxrjLercqP7tALZvEib6zaZTQDw-QJ0TbCN5v0nndtO2K-3KDE6OpmS6PmH3f6ekb9KepYJ54nYS3kuJrxEYplm4nWIgykmYTcaQnR2ZKHpHck-SArSh0VHdMMSXZTEkuwSmqpyTXkGjMSz~NdML-fEsPJnSSDoOF2bGD7X6fpDwHg05hkcJaHuHQ__",
];

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

const useVideoControls = (initialState = { muted: true, liked: false }) => {
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
  const swipeButtonsRef = useRef<(HTMLButtonElement | null)[]>([]); // Array of refs for swipe buttons
  const eventDetailRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { isMuted, isLiked, toggleMute, toggleLike, togglePlayback } =
    useVideoControls();
  const history = useHistory();

  const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchEnd = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [filterVisible, setFilterVisible] = useState(false);

  const handleTouchStart = useCallback((e: TouchEvent, index: number) => {
    setCurrentVideoIndex(index);
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    const deltaX = touchEnd.current.x - touchStart.current.x;
    if (eventDetailRef.current && window.innerWidth >= Math.abs(deltaX))
      eventDetailRef.current.style.transform = `translateX(${deltaX}px)`;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistanceX = Math.abs(touchEnd.current.x - touchStart.current.x);
    const swipeDistanceY = Math.abs(touchEnd.current.y - touchStart.current.y);

    if (swipeDistanceX > 50 && swipeDistanceY < 10) {
      const isSwipeLeft = touchEnd.current.x < touchStart.current.x;

      if (isSwipeLeft && eventDetailRef.current) {
        // Animate to left when swiped
        eventDetailRef.current.style.transform = `translateX(-100%)`; // Move to left
        setTimeout(() => {
          handleGoEventDetail();
        }, 300);
      }
    } else {
      if (eventDetailRef.current) {
        // Reset position if not an effective swipe
        eventDetailRef.current.style.transform = `translateX(0)`;
      }
    }
  }, []);

  useEffect(() => {
    swipeButtonsRef.current.forEach((button, index) => {
      if (button) {
        button.addEventListener("touchstart", (e) =>
          handleTouchStart(e, index)
        );
        button.addEventListener("touchmove", (e) => handleTouchMove(e));
        button.addEventListener("touchend", () => handleTouchEnd());

        return () => {
          button.removeEventListener("touchstart", (e) =>
            handleTouchStart(e, index)
          );
          button.removeEventListener("touchmove", (e) => handleTouchMove(e));
          button.removeEventListener("touchend", () => handleTouchEnd());
        };
      }
    });
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    if (eventDetailRef.current) {
      // Smooth transition for transform
      eventDetailRef.current.style.transition = "transform 0.3s ease";
    }
  }, [eventDetailRef.current?.style.transform]);

  const handleGoEventDetail = () => {
    history.push("/event-detail");
  };

  return (
    <IonPage>
      <IonContent fullscreen={true} onClick={() => togglePlayback(videoRef)}>
        <div
          className="relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
          ref={scrollRef}
        >
          {VIDEO_URLS.map((video, index) => (
            <div
              key={index + "-container"}
              className="relative snap-center h-screen"
            >
              <video
                ref={videoRef}
                muted={isMuted}
                playsInline
                // autoPlay
                className={`inset-0 object-cover w-full h-screen absolute top-0`}
                loop
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="relative z-10 flex items-end h-full">
                <div className="absolute top-7 w-full flex items-center justify-between px-4">
                  <p
                    className="text-[27px] font-bold cursor-pointer"
                    onClick={() => history.push("host-detail")}
                  >
                    Tailored
                  </p>
                  <div className="flex gap-1">
                    <img
                      className="h-6"
                      src={PageInfoSVG}
                      alt="Page Info"
                      onClick={() => setFilterVisible(true)}
                    />
                  </div>
                </div>

                <button
                  ref={(el) => (swipeButtonsRef.current[index] = el)} // Assigning ref dynamically
                  className={`absolute top-[46%] flex items-center right-3 p-2 rounded-[20px] bg-black bg-opacity-30 backdrop-blur-sm border border-solid border-white border-opacity-75 animate-wiggle`}
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
                          <img
                            src={MusicSVG}
                            alt="Music"
                            className="h-[17px]"
                          />
                          <p className="text-label-small font-medium ml-2">
                            Commercial
                          </p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <FooterBar />
            </div>
          ))}
          <SwipeableEdgeDrawer
            openState={filterVisible}
            onClose={() => setFilterVisible(false)}
          />
          <div
            ref={eventDetailRef}
            className={`absolute top-[calc(${currentVideoIndex}*100vh)] left-full h-full w-full`}
          >
            <EventDetail />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
