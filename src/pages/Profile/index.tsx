import React from "react";
import { ProfileType, ProfileListType } from "./type";
import UserSVG from "../../../resources/svg/profile.svg";
import BirthSVG from "../../../resources/svg/gift.svg";
import HammerSVG from "../../../resources/svg/hammer.svg";
import DocumentSVG from "../../../resources/svg/document.svg";
import RecycleSVG from "../../../resources/svg/recycle.svg";
import ArrowRigthSVG from "../../../resources/svg/arrow-right.svg";
import ArrowBack from "../../components/ArrowBack";

const ProfileList: React.FC<ProfileListType> = ({ img, title, text, type }) => {
  return (
    <div
      className={`flex items-center justify-between w-full pb-6 pt-4 ${
        !type && "border-b border-[var(--primary-border-color)]"
      }`}
    >
      <div className="flex">
        <img src={img} alt="profile" />
        <div className={`flex ml-4 `}>
          <p
            className={`text-body-small font-bold ${
              type ? "text-[#ff8578]" : "text-white"
            }`}
          >
            {title} {text ? ":" : ""}
          </p>
          <p className="text-body-small ml-1">{text}</p>
        </div>
      </div>
      {type !== "delete" && <img src={ArrowRigthSVG} alt="profile" />}
    </div>
  );
};

const Profile: React.FC<ProfileType> = ({
  imgUrl = "https://t4.ftcdn.net/jpg/07/90/04/33/240_F_790043387_sjkrr01wF935RYQzWHsqePxZ1SDantUJ.jpg",
  title = "Stefano Alberto Profietti",
  subTitle = "@stefanoproietti",
  userName = "stefano_p",
  birthday = "12 March",
}) => {
  return (
    <>
      <div
        className="relative w-full h-1/2 overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <ArrowBack />
        <div className="absolute bottom-7 text-white p-4">
          <p className="text-title-medium font-bold w-5/6 leading-snug">
            {title}
          </p>
          <p className="text-body-small mt-2">{subTitle}</p>
        </div>
      </div>
      <div className="text-white px-4 rounded-t-rounded relative mt-[-35px] bg-primaryContainer">
        <div className="">
          <ProfileList img={UserSVG} title="Username" text={userName} />
          <ProfileList img={BirthSVG} title="Date of Birth" text={birthday} />
          <p className="text-body-medium mt-5 font-bold">Account</p>
          <ProfileList img={HammerSVG} title="Terms of Service" />
          <ProfileList img={DocumentSVG} title="Pravacy Policy" />
          <ProfileList img={RecycleSVG} title="Delect Account" type="delete" />
        </div>
      </div>
    </>
  );
};

export default Profile;
