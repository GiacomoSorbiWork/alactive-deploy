import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IonContent, IonPage } from "@ionic/react";
import { LargeDefaultButton } from "../../subComponents/Buttons";
import logo from "../../../resources/logo.svg";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-12">
          <img src={logo} alt="logo" className="h-[180px] mb-14" />
          <LargeDefaultButton
            text="Continue"
            className="w-full"
            onClick={() => loginWithRedirect()}
            state={"isActive"}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
