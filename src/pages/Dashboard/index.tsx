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
  "https://cdn01.cimediacloud.com/cifiles/9d539a4a8592498d92b543c65a5830d3/renditions/video-3g.mp4?response-content-disposition=attachment%3Bfilename%3D%22Ci-Media-Cloud-3G_480x270p.mp4%22%3Bfilename*%3DUTF-8%27%27Ci-Media-Cloud-3G_480x270p.mp4&u=ef2ae2aca3804809b4cf91f5079a4b35&a=ef7939726db546019390b8aeca8e7ea0&et=download&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NkbjAxLmNpbWVkaWFjbG91ZC5jb20vY2lmaWxlcy85ZDUzOWE0YTg1OTI0OThkOTJiNTQzYzY1YTU4MzBkMy9yZW5kaXRpb25zL3ZpZGVvLTNnLm1wND9yZXNwb25zZS1jb250ZW50LWRpc3Bvc2l0aW9uPWF0dGFjaG1lbnQlM0JmaWxlbmFtZSUzRCUyMkNpLU1lZGlhLUNsb3VkLTNHXzQ4MHgyNzBwLm1wNCUyMiUzQmZpbGVuYW1lKiUzRFVURi04JTI3JTI3Q2ktTWVkaWEtQ2xvdWQtM0dfNDgweDI3MHAubXA0JnU9ZWYyYWUyYWNhMzgwNDgwOWI0Y2Y5MWY1MDc5YTRiMzUmYT1lZjc5Mzk3MjZkYjU0NjAxOTM5MGI4YWVjYThlN2VhMCZldD1kb3dubG9hZCIsIkNvbmRpdGlvbiI6eyJJcEFkZHJlc3MiOnsiQVdTOlNvdXJjZUlwIjoiMC4wLjAuMC8wIn0sIkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzI1MzU3MDY1fX19XX0_&Signature=J27RoSJ~p-5VfReqVG9jwKdE5Vo~RO85SGBoIvbw2-y35Aj6M7uCuA4DFMrKtvjf5sNxKUgoQvh~VnlD72BUgGyC29RVe8FFUAAOfeJEuMHusU1d7vlHfszL03APBSdrPahP4B1I0EBqjqpNWk7ZjPBeOUMpZ1U7qvQfOjrRaY4_&Key-Pair-Id=APKAJNUSFH4IKQRZ44WA",
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
  const swipeButtonsRef = useRef<HTMLButtonElement | null>(null);
  const eventDetailRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const history = useHistory();
  const [filterVisible, setFilterVisible] = useState(false);
  const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchEnd = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const { isMuted, isLiked, toggleMute, toggleLike } = useVideoControls();

  // Helper function to handle navigating to the event detail page
  const handleGoEventDetail = useCallback(() => {
    history.push("/event-detail");
  }, [history]);

  // Function to handle touch start on swipe buttons
  const handleSwipeButtonTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  // Function to handle touch move on swipe buttons
  const handleSwipeButtonTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    const deltaX = touchEnd.current.x - touchStart.current.x;
    if (eventDetailRef.current && window.innerWidth >= Math.abs(deltaX)) {
      eventDetailRef.current.style.transform = `translateX(${deltaX}px)`;
    }
  }, []);

  // Function to handle touch end on swipe buttons
  const handleSwipeButtonTouchEnd = useCallback(() => {
    const swipeDistanceX = Math.abs(touchEnd.current.x - touchStart.current.x);
    const swipeDistanceY = Math.abs(touchEnd.current.y - touchStart.current.y);

    if (swipeDistanceX > 50 && swipeDistanceY < 10) {
      const isSwipeLeft = touchEnd.current.x < touchStart.current.x;

      if (isSwipeLeft && eventDetailRef.current) {
        // Animate to the left when swiped
        eventDetailRef.current.style.transform = `translateX(-100%)`; // Move to left
        setTimeout(handleGoEventDetail, 300);
      }
    } else if (eventDetailRef.current) {
      // Reset position if not an effective swipe
      eventDetailRef.current.style.transform = `translateX(0)`;
    }
  }, [handleGoEventDetail]);

  // Effect to handle adding and removing touch events on swipe buttons
  useEffect(() => {
    const element = swipeButtonsRef.current;
    if (element) {
      element.addEventListener("touchstart", handleSwipeButtonTouchStart);
      element.addEventListener("touchmove", handleSwipeButtonTouchMove);
      element.addEventListener("touchend", handleSwipeButtonTouchEnd);

      return () => {
        element.removeEventListener("touchstart", handleSwipeButtonTouchStart);
        element.removeEventListener("touchmove", handleSwipeButtonTouchMove);
        element.removeEventListener("touchend", handleSwipeButtonTouchEnd);
      };
    }
  }, [
    handleSwipeButtonTouchStart,
    handleSwipeButtonTouchMove,
    handleSwipeButtonTouchEnd,
  ]);

  // Handle video playback based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Adjust the threshold as needed
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  // Function to handle touch events on the scrollable container
  const handleScrollTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleScrollTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleScrollTouchEnd = useCallback(() => {
    const swipeDistanceY = touchEnd.current.y - touchStart.current.y;

    if (swipeDistanceY < 0) {
      scrollRef.current?.scrollBy({
        top: window.innerHeight,
        behavior: "instant",
      });
    }
    if (swipeDistanceY > 0) {
      scrollRef.current?.scrollBy({
        top: -window.innerHeight,
        behavior: "instant",
      });
    }
  }, []);

  // Effect to manage touch events on the scrollable container
  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener("touchstart", handleScrollTouchStart);
      element.addEventListener("touchmove", handleScrollTouchMove);
      element.addEventListener("touchend", handleScrollTouchEnd);

      return () => {
        element.removeEventListener("touchstart", handleScrollTouchStart);
        element.removeEventListener("touchmove", handleScrollTouchMove);
        element.removeEventListener("touchend", handleScrollTouchEnd);
      };
    }
  }, [handleScrollTouchStart, handleScrollTouchMove, handleScrollTouchEnd]);

  // Effect to add smooth transition to the event detail element
  useEffect(() => {
    if (eventDetailRef.current) {
      eventDetailRef.current.style.transition = "transform 0.3s ease";
    }
    setTimeout(() => {
      if (swipeButtonsRef.current) {
        swipeButtonsRef.current.style.display = "none";
      }
    }, 5000);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="relative h-screen">
          <div
            className="relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
            ref={scrollRef}
          >
            {VIDEO_URLS.map((video, index) => (
              <video
                key={index + "-container"}
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                muted={isMuted}
                playsInline
                className={`snap-center inset-0 object-cover w-full h-screen absolute`}
                style={{
                  top: `calc(${index} * 100vh)`,
                }}
                loop
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
          <>
            <p
              className="text-[27px] font-bold cursor-pointer absolute top-5 left-4"
              onClick={() => history.push("event-detail")}
            >
              Tailored
            </p>
            <img
              className="h-6 absolute right-3 top-5"
              src={PageInfoSVG}
              alt="Page Info"
              onClick={() => setFilterVisible(true)}
            />
            <button
              ref={swipeButtonsRef} // Assigning ref dynamically
              className={`absolute top-[46%] flex items-center right-3 p-2 rounded-[20px] bg-black bg-opacity-30 backdrop-blur-sm border border-solid border-white border-opacity-75 animate-wiggle`}
            >
              <img src={ArrowLeft} alt="Swipe for Details" />
              <p className="text-body-small font-semibold leading-[17px]">
                Swipe for Details
              </p>
            </button>
            <div className="absolute flex flex-col items-center bottom-[83px] right-[5px]">
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
          </>
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
          <FooterBar />
          <SwipeableEdgeDrawer
            openState={filterVisible}
            onClose={() => setFilterVisible(false)}
          />
          <div
            ref={eventDetailRef}
            className={`absolute top-0 left-full h-full w-full`}
          >
            <EventDetail />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
