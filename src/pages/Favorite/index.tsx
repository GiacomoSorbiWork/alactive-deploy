import React, { useState } from "react";
import EventCard from "../../components/EventCard";
import HostCard from "../../components/HostCard";

const Favorite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <>
      <h2 className="text-title-small font-bold mb-6 text-white text-center m-3">
        Favorites
      </h2>
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
              <span className="w-12 h-[2px] bg-[var(--primary-color)]"></span>
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
              Hosts
            </button>
            {activeTab === 1 && (
              <span className="w-12 h-[2px] bg-[var(--primary-color)]"></span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 text-white overflow-y-auto">
        {activeTab === 0 && (
          <div>
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
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="flex flex-col gap-4">
            <HostCard
              imgUrl="https://t4.ftcdn.net/jpg/08/19/24/63/240_F_819246328_2nfWzjhKYjhnl1yURFR0NL1oToq8FDnn.jpg"
              title="Maroto"
              subTitle="NightClub"
            />
            <HostCard
              imgUrl="https://t3.ftcdn.net/jpg/07/40/76/48/240_F_740764831_GIRbum3PNYK0bKMOGXjoOPBhnaBkWNzo.jpg"
              title="Maroto"
              subTitle="NightClub"
            />
            <HostCard
              imgUrl="https://t4.ftcdn.net/jpg/07/90/04/33/240_F_790043387_sjkrr01wF935RYQzWHsqePxZ1SDantUJ.jpg"
              title="Maroto"
              subTitle="NightClub"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Favorite;
