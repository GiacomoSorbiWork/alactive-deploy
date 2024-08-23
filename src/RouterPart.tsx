import React, { useEffect } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import HostDetail from "./pages/HostDetail";
import EventDetail from "./pages/EventDetail";
import DashboardWithTabs from "./DashboardWithTabs";
import Testing from "./pages/Testing";

const RouterPart: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/home");
    }
  }, [isAuthenticated, history]);

  return (
    <IonRouterOutlet className="bg-primaryContainer overflow-y-auto">
      <Switch>
        <>
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/host-detail" component={HostDetail} />
          <Route exact path="/event-detail" component={EventDetail} />
          <Route
            path={["/dashboard", "/profile", "/favorite"]}
            component={DashboardWithTabs}
          />
          <Route exact path="/test" component={Testing} />
          <Redirect from="*" to="/dashboard" />
        </>
        <Redirect from="*" to="/home" />
      </Switch>
    </IonRouterOutlet>
  );
};

export default RouterPart;
