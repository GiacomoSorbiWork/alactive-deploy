import React from "react";
import MediaView from "../../components/MediaView";
import { Media } from "../../components/MediaView/type";
import { IonContent, IonPage } from "@ionic/react";
import ArrowBack from "../../components/ArrowBack";

const items: Media[] = [
  {
    type: "image",
    src: "https://t4.ftcdn.net/jpg/08/19/24/63/240_F_819246328_2nfWzjhKYjhnl1yURFR0NL1oToq8FDnn.jpg",
    alt: "Image 1",
  },
  {
    type: "video",
    src: "https://s3-figma-videos-production-sig.figma.com/video/1267800981591854695/TEAM/08d0/bd09/-14c7-44ca-b923-a3436e290c96?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aMMwUnH5kfSTj56rB5Rp3RjRyLnTSo11ugDGbxe410xllYK5LNQ0wzQKhsgXmsvzU5PGvMST8QEzsxY086~pZcPYMqIkhj0UOKkCK4I1PSH6YW59FI3~OKAFxDrh7H6E5DoCgFw0Dsg4DD~ovArSwsF3JywwyzL-WNrUwfuLhwHYIDC14Y9P3RPXey0Urk1ERbR6gXLrB94JluZZqsjvqGtERIZqPS1vxPpGbQ-C4J58kgmm7qVfiUugqW5jjbPkkXDBFF~KFj1ziiZxfC1tDnJzqiz1V6gTd3cTlD-kI86GEzd9rSbGalJ0qEyxIGBn5C4B7fycA43vK-4KA2sB~A__",
  },
  {
    type: "image",
    src: "https://t3.ftcdn.net/jpg/07/40/76/48/240_F_740764831_GIRbum3PNYK0bKMOGXjoOPBhnaBkWNzo.jpg",
    alt: "Image 2",
  },
];

const EventMediaView: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="flex justify-center h-full">
          <ArrowBack />
          <MediaView items={items}></MediaView>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default EventMediaView;
