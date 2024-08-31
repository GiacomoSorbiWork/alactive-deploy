import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { LargeDefaultButton } from "../../subComponents/Buttons";
import logo from "../../../resources/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const [isClicked, setIsClicked] = useState(false);

  setTimeout(() => {
    setIsClicked(true);
  }, 1000);
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
              <div className="flex flex-col items-center justify-center min-h-screen bg-black p-12">
                <img src={logo} alt="logo" className="h-[180px] mb-14" />
                <LargeDefaultButton
                  text="Continue"
                  className="w-full"
                  onClick={() => loginWithRedirect()}
                  state={"isActive"}
                />
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
