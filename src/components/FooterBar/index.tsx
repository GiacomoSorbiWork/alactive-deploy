import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import FavoriteSVG from "../../../resources/svg/favorite.svg";
import ActiveFavoriteSVG from "../../../resources/svg/active-favorite.svg";
import ProfileSVG from "../../../resources/svg/Frame.svg";
import ActiveHomeSVG from "../../../resources/svg/active-home.svg";
import HomeSVG from "../../../resources/svg/home.svg";

const FooterBar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="backdrop-blur-md h-[75px] flex justify-around items-center fixed bottom-0 w-full z-20 border-t border-white border-opacity-35">
      <Link to="/dashboard" className="flex flex-col items-center">
        <img
          src={location.pathname === "/dashboard" ? ActiveHomeSVG : HomeSVG}
          alt="Home"
        />
        <span
          className={classNames({
            "text-activeButton": location.pathname === "/dashboard",
            "text-body-small font-semibold leading-[17px]": true,
          })}
        >
          Home
        </span>
      </Link>
      <Link to="/favorite" className="flex flex-col items-center">
        <img
          src={
            location.pathname === "/favorite" ? ActiveFavoriteSVG : FavoriteSVG
          }
          alt="Favorite"
        />
        <span
          className={classNames({
            "text-activeButton": location.pathname === "/favorite",
            "text-body-small font-semibold leading-[17px]": true,
          })}
        >
          Favorite
        </span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center">
        <img src={ProfileSVG} alt="Profile" />
        <span
          className={classNames({
            "text-activeButton": location.pathname === "/profile",
            "text-body-small font-semibold leading-[17px]": true,
          })}
        >
          Profile
        </span>
      </Link>
    </div>
  );
};

export default FooterBar;
