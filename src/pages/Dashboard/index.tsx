import React, { useCallback, useEffect, useRef, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import SwipeableEdgeDrawer from "../../components/SwipeableEdgeDrawer";
import FooterBar from "../../components/FooterBar";
import EventDetail, { MUTATION_LIKE } from "../EventDetail";
import { AccessPolicy } from "../../__generated__/graphql";
import playM3u8 from "../../util/playM3u8";

// Import SVGs
import FavoriteSVG from "../../../resources/svg/favorite.svg";
import LikedSVG from "../../../resources/svg/liked.svg";
import MuteSVG from "../../../resources/svg/Speaker.svg";
import UnmuteSVG from "../../../resources/svg/mute.svg";
import CreditSVG from "../../../resources/svg/solar_wallet-linear.svg";
import CalendarSVG from "../../../resources/svg/calendar.svg";
import ArrowLeft from "../../../resources/svg/Left Arrow.svg";
import MusicSVG from "../../../resources/svg/musical-note-music-svgrepo-com.svg";

// GraphQL queries
const QUERY_WHAT_I_LIKE = gql`
  query whatILike {
    me {
      likes {
        id
      }
    }
  }
`;

const QUERY_RECOMMEND = gql`
  query recommendMe {
    recommendMe {
      id
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
        minPrice
        currency
      }
      hostedAt {
        id
        name
        avatar
      }
    }
  }
`;

// Types
interface IconButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

interface Event {
  id: string;
  name: string;
  description: string;
  musicGenres: string[];
  video: string;
  media: string;
  datetime: string;
  duration: number;
  recurrence: string;
  tags: string[];
  accessPolicies: AccessPolicy[];
  hostedAt: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface QueryData {
  recommendMe: Event[];
}

interface LikeData {
  me: {
    likes: { id: string }[];
  };
}

// Helper functions
export const extractMinPrice = (policies: AccessPolicy[]): string => {
  const policy = policies.reduce(
    (min, policy) => {
      const minPrice = parseFloat(policy.minPrice);
      return minPrice < min.minPrice
        ? { minPrice, currency: policy.currency }
        : min;
    },
    { minPrice: Infinity, currency: "" }
  );

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: policy.currency,
    maximumFractionDigits: 0,
  }).format(Math.round(policy.minPrice));
};

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick }) => {
  if (!icon || !label) return null;

  return (
    <button
      className="flex flex-col items-center m-2 cursor-pointer"
      onClick={onClick}
      aria-label={label}
    >
      <img
        style={{ clipPath: "circle(50% at 50% 50%)" }}
        src={icon}
        className={`${
          ["Like", "Liked", "Mute", "Unmute"].includes(label)
            ? "w-8"
            : "h-10 w-10"
        }`}
        alt={label}
      />
      <p className="text-body-small">{label}</p>
    </button>
  );
};

const useVideoControls = (initialState = { id: "", muted: false }) => {
  const [isMuted, setIsMuted] = useState<boolean>(initialState.muted);
  const toggleMute = () => setIsMuted((prev) => !prev);
  return { isMuted, toggleMute };
};

const DashBoard: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const swipeButtonsRef = useRef<HTMLButtonElement | null>(null);
  const eventDetailRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const history = useHistory();
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchEnd = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentEventId, setCurrentEventId] = useState<string>("");
  const [feedStartTime, setFeedStartTime] = useState<number>(0);

  const { data: ILike, refetch: refetchILike } =
    useQuery<LikeData>(QUERY_WHAT_I_LIKE);
  const { loading, data } = useQuery<QueryData>(QUERY_RECOMMEND);

  const { isMuted, toggleMute } = useVideoControls();

  const [likedEvents, setLikedEvents] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [setLikeRequest] = useMutation(MUTATION_LIKE);

  useEffect(() => {
    if (!loading && feedStartTime <= 6) {
      const timer = setTimeout(
        () => setFeedStartTime((prev) => prev + 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [feedStartTime, loading]);

  useEffect(() => {
    if (ILike && data) {
      const initialLikedState = data.recommendMe.reduce((acc, event) => {
        acc[event.id] = ILike.me.likes.some((like) => like.id === event.id);
        return acc;
      }, {} as { [key: string]: boolean });
      setLikedEvents(initialLikedState);
    }
  }, [ILike, data]);

  useEffect(() => {
    refetchILike();
  }, [likedEvents, refetchILike]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.muted = isMuted;
            if (video.src === "") {
              video.src = String(
                data?.recommendMe.find((event) => event.id === video.id)?.video
              );
              await playM3u8(video.src, video);
            }
          } else {
            video.muted = true;
          }
          setCurrentEventId(video.id);
        });
      },
      { threshold: 0.1 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [isMuted, data]);

  useEffect(() => {
    if (eventDetailRef.current) {
      eventDetailRef.current.style.transition = "transform 0.1s ease";
    }
    const currentEventIndex =
      data?.recommendMe.findIndex((item) => item.id === currentEventId) ?? 0;
    if (
      !loading &&
      ((currentEventIndex < 3 && feedStartTime > 6) ||
        (currentEventIndex >= 3 && feedStartTime > 3))
    ) {
      if (swipeButtonsRef.current) {
        Object.assign(swipeButtonsRef.current.style, {
          top: "0px",
          opacity: "0",
          height: "92vh",
          width: "10px",
          right: "0px",
        });
        swipeButtonsRef.current.id = "";
      }
    }
  }, [loading, feedStartTime, currentEventId, data]);

  const handleGoEventDetail = useCallback(() => {
    history.push("/event/" + currentEventId);
  }, [history, currentEventId]);

  const handleSwipeButtonTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleSwipeButtonTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    const deltaX = touchEnd.current.x - touchStart.current.x + 10;
    if (eventDetailRef.current && window.innerWidth >= Math.abs(deltaX)) {
      eventDetailRef.current.style.transform = `translateX(${deltaX}px)`;
    }
  }, []);

  const handleSwipeButtonTouchEnd = useCallback(() => {
    const swipeDistanceX = Math.abs(touchEnd.current.x - touchStart.current.x);
    const swipeDistanceY = Math.abs(touchEnd.current.y - touchStart.current.y);

    if (swipeDistanceX > 30 && swipeDistanceY < 10) {
      const isSwipeLeft = touchEnd.current.x < touchStart.current.x;

      if (isSwipeLeft && eventDetailRef.current) {
        eventDetailRef.current.style.transform = `translateX(-100%)`;
        setTimeout(handleGoEventDetail, 200);
      }
    } else if (eventDetailRef.current) {
      eventDetailRef.current.style.transform = `translateX(0)`;
    }
  }, [handleGoEventDetail]);

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

  const EventPlaceholder: React.FC = () => (
    <div className="relative h-full">
      <div className="bg-gray-700 w-full h-full absolute animate-pulse"></div>
      <div className="absolute flex flex-col items-center bottom-[83px] right-[5px]">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-[50px] h-[50px] rounded-full bg-gray-600 mb-2 animate-pulse"
          ></div>
        ))}
      </div>
      <div className="absolute bottom-[90px] left-4">
        <p className="text-title-small font-bold my-2 bg-gray-600 h-6 w-[150px] rounded-md animate-pulse"></p>
        <div className="overflow-hidden w-[75vw]">
          <div className="flex animate-marqueeDashboard gap-3">
            {[...Array(3)].map((_, index) => (
              <React.Fragment key={index}>
                {["Price", "Date", "Music Genre"].map((type, i) => (
                  <div
                    key={`${type}-${i}`}
                    className="flex items-center px-2 py-1 min-w-max min-h-9 bg-gray-600 rounded-3xl animate-pulse"
                  >
                    <p
                      className={`text-label-small font-medium ml-2 bg-gray-600 h-4 w-[${
                        type === "Price" ? "100" : "80"
                      }px]`}
                    ></p>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="relative h-full">
          <div
            className="relative h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
            ref={scrollRef}
          >
            {data && data.recommendMe.length > 0 ? (
              data.recommendMe.map((event, index) => (
                <div className="relative h-full" key={event.id}>
                  <video
                    key={`${event.id}-video`}
                    id={event.id}
                    ref={(el) => {
                      if (el) videoRefs.current[index] = el;
                    }}
                    muted={true}
                    autoPlay
                    loop
                    playsInline
                    webkit-playsinline
                    disablePictureInPicture
                    style={{ pointerEvents: "none" }}
                    className="snap-center inset-0 object-cover w-full h-full absolute"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute flex flex-col items-center bottom-[83px] right-[5px]">
                    <IconButton
                      icon={event.hostedAt.avatar}
                      label={event.hostedAt.name}
                      onClick={() =>
                        history.push(`/venue/${event.hostedAt.id}`)
                      }
                    />
                    <IconButton
                      icon={likedEvents[event.id] ? LikedSVG : FavoriteSVG}
                      label={likedEvents[event.id] ? "Liked" : "Like"}
                      onClick={() => {
                        setLikedEvents((prev) => ({
                          ...prev,
                          [event.id]: !prev[event.id],
                        }));
                        setLikeRequest({
                          variables: {
                            id: event.id,
                            like: !likedEvents[event.id],
                          },
                        });
                      }}
                    />
                    <IconButton
                      icon={isMuted ? UnmuteSVG : MuteSVG}
                      label={isMuted ? "Unmute" : "Mute"}
                      onClick={toggleMute}
                    />
                  </div>
                  <div className="absolute bottom-[90px] left-4">
                    <p
                      className="text-title-small font-bold my-2"
                      onClick={() => history.push(`/event/${event.id}`)}
                    >
                      {event.name}
                    </p>
                    <div className="overflow-hidden w-[75vw]">
                      <div className="flex animate-marqueeDashboard gap-3">
                        {[...Array(3)].map((_, index) => (
                          <React.Fragment key={index}>
                            <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 backdrop-blur-[3px] rounded-3xl">
                              <img src={CreditSVG} alt="Credit Card" />
                              <p className="text-label-small font-medium ml-2">
                                Starting from{" "}
                                {extractMinPrice(event.accessPolicies)}
                              </p>
                            </div>
                            <div className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 backdrop-blur-[3px] rounded-3xl">
                              <img src={CalendarSVG} alt="Calendar" />
                              <p className="text-label-small font-medium ml-2">
                                {moment(event.datetime).format("DD/MM/yyyy")}
                              </p>
                            </div>
                            {event.musicGenres.map((genre, index) => (
                              <div
                                key={`carousel-genre-${index}`}
                                className="flex items-center px-2 py-1 min-w-max min-h-9 bg-secondaryContainer bg-opacity-40 backdrop-blur-[3px] rounded-3xl"
                              >
                                <img
                                  src={MusicSVG}
                                  alt="Music"
                                  className="h-[17px]"
                                />
                                <p className="text-label-small font-medium ml-2">
                                  {genre}
                                </p>
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EventPlaceholder />
            )}
          </div>
          <>
            <p
              className="text-[27px] font-bold cursor-pointer absolute top-5 left-4"
              onClick={handleGoEventDetail}
            >
              Tailored
            </p>
            <button
              ref={swipeButtonsRef}
              id="animate-wiggle"
              className="absolute top-[46%] flex items-center right-3 p-2 rounded-[20px] bg-black bg-opacity-30 backdrop-blur-sm border border-solid border-white border-opacity-75"
            >
              <img src={ArrowLeft} alt="Swipe for Details" />
              <p className="text-body-small font-semibold leading-[17px]">
                Swipe for Details
              </p>
            </button>
            <FooterBar />
          </>
          <SwipeableEdgeDrawer
            openState={filterVisible}
            onClose={() => setFilterVisible(false)}
          />
          <div
            ref={eventDetailRef}
            className="absolute top-0 left-full h-full w-full"
          >
            <EventDetail />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashBoard;
