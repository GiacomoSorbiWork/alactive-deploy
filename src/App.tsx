import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Register from "./pages/Register";
import DashBoard from "./pages/Dashboard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import HomeSVG from "../resources/svg/Vector 5 (Stroke).svg";
import FavoriteSVG from "../resources/svg/Vector.svg";
import ProfileSVG from "../resources/svg/Frame.svg";
import logo from "../resources/logo.svg";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <RouterPart />
      </IonReactRouter>
    </IonApp>
  );
};

const RouterPart: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={DashboardWithTabs} />
        <Redirect from="*" to="/" />
      </Switch>
    </IonRouterOutlet>
  );
};

const Home: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div onClick={handleClick}>
      {!isClicked ? (
        <div className="bg-[var(--primary-color)] h-screen flex justify-center items-center cursor-pointer">
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <div className="bg-black h-screen">
          <Register />
        </div>
      )}
    </div>
  );
};

const DashboardWithTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/register" component={Register} />
        <Route>
          <Redirect to="/dashboard" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={HomeSVG} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="favorite" href="/tab2">
          <IonIcon icon={FavoriteSVG} />
          <IonLabel>Favorite</IonLabel>
        </IonTabButton>
        <IonTabButton tab="porfile" href="/porfile">
          <IonIcon icon={ProfileSVG} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default App;
