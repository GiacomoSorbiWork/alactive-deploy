import React, { useState } from "react";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
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
// import { useAuth0 } from "@auth0/auth0-react";

import Register from "./pages/Register";
import DashBoard from "./pages/Dashboard";
import Profile from "./pages/Profile";

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

import HomeSVG from "../resources/svg/home.svg";
import FavoriteSVG from "../resources/svg/favorite.svg";
import ProfileSVG from "../resources/svg/Frame.svg";
import ActiveHomeSVG from "../resources/svg/active-home.svg";
import ActiveFavoriteSVG from "../resources/svg/active-favorite.svg";
import logo from "../resources/logo.svg";
// import Login from "./pages/Login";
import HostDetail from "./pages/HostDetail";
import EventDetail from "./pages/EventDetail";
import Favorite from "./pages/Favorite";
import Testing from "./pages/Testing";

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
  // const { isAuthenticated, logout } = useAuth0();

  return (
    <>
      {/* {!isAuthenticated ? (
        <Login />
      ) : ( */}
      <IonRouterOutlet className="bg-primaryContainer overflow-y-auto">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Testing} />
          <Route exact path="/host-detail" component={HostDetail} />
          <Route exact path="/event-detail" component={EventDetail} />
          <Route
            path={["/dashboard", "/profile", "/favorite"]}
            component={DashboardWithTabs}
          />
          <Route exact path="/register" component={Register} />
          {/* <Redirect from="*" to="/" /> */}
        </Switch>
      </IonRouterOutlet>
      {/* )} */}
    </>
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
        <div className="bg-activeButton h-screen flex justify-center items-center cursor-pointer">
          <img src={logo} alt="logo" />
        </div>
      ) : (
        <div className="bg-primaryContainer h-screen flex flex-col">
          <Register />
        </div>
      )}
    </div>
  );
};

const DashboardWithTabs: React.FC = () => {
  const location = useLocation();

  const shouldShowTabs = location.pathname !== "/register";
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/favorite" component={Favorite} />
        <Redirect to="/dashboard" />
      </IonRouterOutlet>

      {shouldShowTabs && (
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            {location.pathname === "/dashboard" ? (
              <>
                <IonIcon icon={ActiveHomeSVG} />
                <IonLabel className="text-activeButton">Home</IonLabel>
              </>
            ) : (
              <>
                <IonIcon icon={HomeSVG} />
                <IonLabel>Home</IonLabel>
              </>
            )}
          </IonTabButton>
          <IonTabButton tab="favorite" href="/favorite">
            {location.pathname === "/favorite" ? (
              <>
                <IonIcon icon={ActiveFavoriteSVG} />
                <IonLabel className="text-activeButton">Favorite</IonLabel>
              </>
            ) : (
              <>
                <IonIcon icon={FavoriteSVG} />
                <IonLabel>Favorite</IonLabel>
              </>
            )}
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={ProfileSVG} />
            {location.pathname === "/profile" ? (
              <IonLabel className="text-activeButton">Profile</IonLabel>
            ) : (
              <IonLabel>Profile</IonLabel>
            )}
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  );
};

export default App;
