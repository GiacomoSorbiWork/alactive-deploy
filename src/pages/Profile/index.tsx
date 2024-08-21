import React from "react";
import CarouselComponent from "../../components/Carousel";
import items from "../../components/Carousel/data";

const Profile: React.FC = () => {
  return <CarouselComponent items={items} />;
};

export default Profile;
