import React, { useEffect, useState } from "react";
import { IonContent, IonFooter, IonPage } from "@ionic/react";
import { LargeDefaultButton } from "../../subComponents/Buttons";
import logo from "../../../resources/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <IonPage className="fullscreen">
      <IonContent scrollY={false} fullscreen>
        <div className="bg-primaryContainer h-full flex flex-col items-center justify-center p-4">
            <img src={logo} alt="logo" className="h-[180px]" />
        </div>
      </IonContent>
      {isClicked && (
        <IonFooter className="p-4 mb-4">
          <LargeDefaultButton
            text="Continue"
            className="w-full"
            onClick={() => loginWithRedirect()}
            state={"isActive"}
          />
        </IonFooter>
      )}
    </IonPage>
  );
};

export default Login;
