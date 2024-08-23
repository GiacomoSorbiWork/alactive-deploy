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
import Loading from "./components/Loading"; // Consider using a dedicated loading component

const RouterPart: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push("/home");
    }
  }, [isAuthenticated, isLoading, history]);

  if (isLoading) return <Loading />; // Show a spinner or loading component while authentication is being verified

  if (error) return <div>Error: {error.message}</div>; // Handle errors

  return (
    <IonRouterOutlet className="bg-primaryContainer overflow-y-auto">
      <Switch>
        <Route exact path="/home" component={Home} />
        {isAuthenticated ? (
          <>
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
        ) : (
          <Redirect from="*" to="/home" />
        )}
      </Switch>
    </IonRouterOutlet>
  );
};

export default RouterPart;
