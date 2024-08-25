import React, { useEffect } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import HostDetail from "./pages/HostDetail";
import EventDetail from "./pages/EventDetail";
import DashBoard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import Loading from "./components/Loading"; // Consider using a dedicated loading component
import EventMediaView from "./pages/EventMediaView";

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
        <Route exact path="/register" component={Register} />
        {isAuthenticated ? (
          <>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/host-detail" component={HostDetail} />
            <Route exact path="/event-detail" component={EventDetail} />
            <Route exact path="/event-view" component={EventMediaView} />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/favorite" component={Favorite} />
            <Redirect to="/dashboard" />
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
