import React, { useState } from "react";
import { Route } from "react-router-dom";
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

import logo from "../resources/logo.svg";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false); // Use state to track click status

  const handleClick = () => {
    setIsClicked(true); // Update state on click
  };
  return (
    <IonApp>
      <IonReactRouter>
        {/* <IonTabs> */}
        <IonRouterOutlet>
          <Route exact path="/">
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
          </Route>
        </IonRouterOutlet>
        {/* <IonTabBar slot="bottom">
          <IonTabButton tab="register" href="/register">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
        {/* </IonTabs> */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
