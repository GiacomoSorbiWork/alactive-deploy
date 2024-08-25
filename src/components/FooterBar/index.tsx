import React from "react";
import classNames from "classnames";
import FavoriteSVG from "../../../resources/svg/favorite.svg";
import ProfileSVG from "../../../resources/svg/Frame.svg";
import ActiveHomeSVG from "../../../resources/svg/active-home.svg";

const FooterBar: React.FC = () => {
  return (
    <div className="backdrop-blur-md h-[75px] flex justify-around items-center fixed bottom-0 w-full">
      <a href="/dashboard" className="flex flex-col items-center">
        <img src={ActiveHomeSVG} />
        <span
          className={classNames({
            "text-activeButton": location.pathname === "/dashboard",
          })}
        >
          Home
        </span>
      </a>
      <a href="/favorite" className="flex flex-col items-center">
        <img src={FavoriteSVG} />
        <span
          className={classNames({
            "text-activeButton": location.pathname === "/favorite",
          })}
        >
          Favorite
        </span>
      </a>
      <a href="/profile" className="flex flex-col items-center">
        <img src={ProfileSVG} />
        <span
          className={classNames({
            "text-activeButton": location.pathname === "/profile",
          })}
        >
          Profile
        </span>
      </a>
    </div>
  );
};

export default FooterBar;
