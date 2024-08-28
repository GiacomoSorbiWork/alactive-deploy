import React, { useState } from "react";
import logo from "../../../resources/logo.svg";
import Login from "../Login";
import { IonContent, IonPage } from "@ionic/react";

const Home: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  setTimeout(() => {
    setIsClicked(true);
  }, 1500);
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div>
          {!isClicked ? (
            <div className="bg-activeButton h-screen flex justify-center items-center cursor-pointer">
              <img src={logo} alt="logo" className="h-[180px]" />
            </div>
          ) : (
            <div className="bg-primaryContainer h-screen flex flex-col">
              <Login />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
