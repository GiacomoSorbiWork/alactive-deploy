import React from "react";
import { HostCardProps } from "./type";
import { useHistory } from "react-router-dom";
import CloudCheckSVG from "../../../resources/svg/artist.svg";

const HostCard: React.FC<HostCardProps> = ({ imgUrl, title, subTitle }) => {
  const history = useHistory();
  return (
    <div
      className="relative w-full h-[242px] rounded-md overflow-hidden bg-cover bg-center text-white border border-white border-opacity-10"
      style={{ backgroundImage: `url(${imgUrl})` }}
      onClick={() => history.push(`/host-events`)}
    >
      <div className="absolute bottom-3 left-3">
        <div className="flex gap-1">
          <p className="text-title-small font-bold">{title}</p>
          <img src={CloudCheckSVG} />
        </div>

        {subTitle && <p className="text-body-medium font-medium">{subTitle}</p>}
      </div>
    </div>
  );
};

export default HostCard;
