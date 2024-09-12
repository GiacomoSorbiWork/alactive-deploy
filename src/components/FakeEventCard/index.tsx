import React from "react";

const FakeEventCard: React.FC<{ isCard?: boolean }> = ({ isCard = true }) => {
    return (
      <div
        className={`relative w-full snap-start ${
          isCard ? "mb-4 aspect-[190/300]" : "mb-3 aspect-[364/554]"
        } rounded-xl overflow-hidden bg-cover bg-center text-white border border-white border-opacity-30 animate-pulse`}
      >
        {/* Placeholder for video or image */}
        <div className="absolute inset-0 w-full h-full bg-gray-300" />
  
        {/* Placeholder for date badge */}
        {isCard && (
          <div className="absolute top-0 right-0 bg-gray-500 bg-opacity-50 w-10 h-8 rounded-bl-xl"></div>
        )}
  
        {/* Placeholder for content */}
        <div
          className={`absolute inset-0 px-2 py-4 h-full flex flex-col justify-end bg-gray-700 bg-opacity-50`}
        >
          {/* Placeholder for title */}
          <div className="w-3/5 h-6 bg-gray-500 mb-2 rounded-sm"></div>
  
          {/* Placeholder for location */}
          {isCard && <div className="w-2/5 h-4 bg-gray-400 rounded-sm"></div>}
        </div>
  
        {/* Placeholder for price */}
        {isCard ? (
          <span className="absolute bottom-2 left-2 w-16 h-4 bg-gray-500 rounded-md"></span>
        ) : (
          <div className="absolute bottom-4 left-4 flex gap-3">
            <div className="flex gap-3">
              <div className="w-32 h-6 bg-gray-500 rounded-3xl"></div>
              <div className="w-32 h-6 bg-gray-500 rounded-3xl"></div>
              <div className="w-32 h-6 bg-gray-500 rounded-3xl"></div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default FakeEventCard;