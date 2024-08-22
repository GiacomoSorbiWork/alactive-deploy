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
import Favorite from "./pages/Favorite";

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
      <IonRouterOutlet className="bg-[var(--primary-background-color)]">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path={["/dashboard", "/profile", "/favorite", "/host-detail"]}
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
  const location = useLocation();

  const shouldShowTabs = location.pathname !== "/register";
  return (
    <IonTabs>
      <IonRouterOutlet className="overflow-auto">
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/favorite" component={Favorite} />
        <Route exact path="/host-detail" component={HostDetail} />
        <Redirect to="/dashboard" />
      </IonRouterOutlet>

      {shouldShowTabs && (
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard" href="/dashboard">
            {location.pathname === "/dashboard" ? (
              <>
                <IonIcon icon={ActiveHomeSVG} />
                <IonLabel style={{ color: "var(--primary-color)" }}>
                  Home
                </IonLabel>
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
                <IonLabel style={{ color: "var(--primary-color)" }}>
                  Favorite
                </IonLabel>
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
              <IonLabel style={{ color: "var(--primary-color)" }}>
                Profile
              </IonLabel>
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
