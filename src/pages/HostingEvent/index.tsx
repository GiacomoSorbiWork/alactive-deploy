import React from "react";
import EventCard from "../../components/EventCard";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import FooterBar from "../../components/FooterBar";
import Logo from "../../../resources/shortcut.svg";
import ArrowBack from "../../components/ArrowBack";

const HostingEvent: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <div className="relative felx items-center">
          <ArrowBack className="top-[-20px]" />
          <h2 className="text-[24px] mt-12 font-bold mb-6 text-white text-center m-3">
            Hosting Events
          </h2>
        </div>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className="p-4 text-white overflow-y-auto mb-[75px]">
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <EventCard
                imgUrl="https://t4.ftcdn.net/jpg/08/19/24/63/240_F_819246328_2nfWzjhKYjhnl1yURFR0NL1oToq8FDnn.jpg"
                title="Sample Event 1"
                date="2 Jun"
                location="New York, NY"
                price="FROM $200"
                titleLogo={Logo}
                nextURL={"host-detail"}
              />
              <EventCard
                imgUrl="https://t3.ftcdn.net/jpg/07/40/76/48/240_F_740764831_GIRbum3PNYK0bKMOGXjoOPBhnaBkWNzo.jpg"
                title="Sample Event 2"
                date="23 Aug"
                location="Los Angeles, CA"
                price="FROM $75"
                nextURL={"host-detail"}
              />
              <EventCard
                imgUrl="https://t4.ftcdn.net/jpg/07/90/04/33/240_F_790043387_sjkrr01wF935RYQzWHsqePxZ1SDantUJ.jpg"
                title="Sample Event 1"
                date="12 Oct"
                location="New York, NY"
                price="FROM $200"
                nextURL={"host-detail"}
              />
              <EventCard
                imgUrl="https://t4.ftcdn.net/jpg/08/19/24/63/240_F_819246328_2nfWzjhKYjhnl1yURFR0NL1oToq8FDnn.jpg"
                title="Sample Event 1"
                date="2 Jun"
                location="New York, NY"
                price="FROM $200"
                titleLogo={Logo}
                nextURL={"host-detail"}
              />
              <EventCard
                imgUrl="https://t3.ftcdn.net/jpg/07/40/76/48/240_F_740764831_GIRbum3PNYK0bKMOGXjoOPBhnaBkWNzo.jpg"
                title="Sample Event 2"
                date="23 Aug"
                location="Los Angeles, CA"
                price="FROM $75"
                nextURL={"host-detail"}
              />
              <EventCard
                imgUrl="https://t4.ftcdn.net/jpg/07/90/04/33/240_F_790043387_sjkrr01wF935RYQzWHsqePxZ1SDantUJ.jpg"
                title="Sample Event 1"
                date="12 Oct"
                location="New York, NY"
                price="FROM $200"
                nextURL={"host-detail"}
              />
            </div>
          </div>
        </div>
        <FooterBar></FooterBar>
      </IonContent>
    </IonPage>
  );
};

export default HostingEvent;
