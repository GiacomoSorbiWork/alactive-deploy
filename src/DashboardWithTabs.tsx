import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import classnames from "classnames";

import DashBoard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";

import HomeSVG from "../resources/svg/home.svg";
import FavoriteSVG from "../resources/svg/favorite.svg";
import ProfileSVG from "../resources/svg/Frame.svg";
import ActiveHomeSVG from "../resources/svg/active-home.svg";
import ActiveFavoriteSVG from "../resources/svg/active-favorite.svg";

const DashboardWithTabs: React.FC = () => {
  const location = useLocation();

  const shouldShowTabs = location.pathname !== "/register";

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/" component={DashBoard} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/favorite" component={Favorite} />
        <Redirect to="/dashboard" />
      </IonRouterOutlet>

      {shouldShowTabs && (
        <IonTabBar slot="bottom" className="backdrop-blur h-[75px]">
          <IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon
              icon={
                location.pathname === "/dashboard" ? ActiveHomeSVG : HomeSVG
              }
            />
            <IonLabel
              className={classnames({
                "text-activeButton": location.pathname === "/dashboard",
              })}
            >
              Home
            </IonLabel>
          </IonTabButton>
          <IonTabButton tab="favorite" href="/favorite">
            <IonIcon
              icon={
                location.pathname === "/favorite"
                  ? ActiveFavoriteSVG
                  : FavoriteSVG
              }
            />
            <IonLabel
              className={classnames({
                "text-activeButton": location.pathname === "/favorite",
              })}
            >
              Favorite
            </IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={ProfileSVG} />
            <IonLabel
              className={classnames({
                "text-activeButton": location.pathname === "/profile",
              })}
            >
              Profile
            </IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  );
};

export default DashboardWithTabs;
