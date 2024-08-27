import React, { useEffect, lazy, Suspense } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";

// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const HostDetail = lazy(() => import("./pages/HostDetail"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const DashBoard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Favorite = lazy(() => import("./pages/Favorite"));
const EventMediaView = lazy(() => import("./pages/EventMediaView"));

const RouterPart: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push("/home");
    }
  }, [isLoading, isAuthenticated, history]);

  if (isLoading) return <Loading />;

  if (error) {
    console.error("Authentication error:", error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <IonRouterOutlet className="bg-primaryContainer overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/home" component={Home} />
          {isAuthenticated ? (
            <>
              <Route exact path="/" component={OnBoarding} />
              <Route exact path="/host-detail" component={HostDetail} />
              <Route exact path="/event-detail" component={EventDetail} />
              <Route exact path="/event-view" component={EventMediaView} />
              <Route exact path="/dashboard" component={DashBoard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/favorite" component={Favorite} />
              {/* <Route exact path="*">
                <Redirect to="/" />
              </Route> */}
            </>
          ) : (
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          )}
        </Switch>
      </Suspense>
    </IonRouterOutlet>
  );
};

export default RouterPart;
