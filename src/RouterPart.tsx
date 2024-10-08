import React, { useEffect, lazy, Suspense, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import HostingEvent from "./pages/HostingEvent";
import { gql } from "./__generated__";
import { useQuery } from "@apollo/client";
import { PurpleScreen } from "./components/PurpleScreen";
import HighlightsView from "./pages/HighlightsView";
import DashBoard from "./pages/Dashboard";

// Lazy load the components
const Login = lazy(() => import("./pages/Login"));
const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const VenueDetail = lazy(() => import("./pages/VenueDetail"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const Favorite = lazy(() => import("./pages/Favorite"));
const EventMediaView = lazy(() => import("./pages/EventMediaView"));

const QUERY_DOL_EXIST = gql(`
  query doIExist2 {
    doIExist 
  }
`);

const RouterPart: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const [purpleScreen, setPurpleScreen] = useState<boolean>(false);
  const history = useHistory();
  const isPreviousLogin = localStorage.getItem("fromLogin") === "true";

  const { data: dolExist, loading: queryLoading } = useQuery(QUERY_DOL_EXIST);

  useEffect(() => {
    if (!isPreviousLogin) {
      setPurpleScreen(true);
    }
    if (!isLoading && !queryLoading) {
      if (!isLoading && !isAuthenticated) {
        history.push("/login");
      } else if (!queryLoading && dolExist) {
        if (dolExist.doIExist) {
          history.push("/dashboard");
        } else {
          history.push("/onboarding");
        }
      }
      setPurpleScreen(false);
    }
  }, [isLoading, isAuthenticated, queryLoading, dolExist, history]);

  if (!purpleScreen && (isLoading || queryLoading)) {
    return <Loading />;
  }

  if (error) {
    console.error("Authentication error:", error);
    return <div>Error: {error.message}</div>;
  }
  if (purpleScreen) return <PurpleScreen />;
  if (isPreviousLogin) localStorage.removeItem("fromLogin");
  return (
    <IonRouterOutlet className="bg-primaryContainer overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <Route exact path="/login" component={Login} />
        {isAuthenticated && (
          <>
            <Route exact path="/" component={OnBoarding} />
            <Route exact path="/onBoarding" component={OnBoarding} />
            <Route path="/venue/:id" component={VenueDetail} />
            <Route exact path="/host-events" component={HostingEvent} />
            <Route path="/event/:id" component={EventDetail} />
            <Route exact path="/event-view" component={EventMediaView} />
            <Route
              exact
              path="/highlight-view/:id/:highlightTitle"
              component={HighlightsView}
            />
            <Route exact path="/dashboard" component={DashBoard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/favorite" component={Favorite} />
          </>
        )}
      </Suspense>
    </IonRouterOutlet>
  );
};

export default RouterPart;
