import React, { useState } from "react";
import MediaView from "../../components/MediaView";
import { Media } from "../../components/MediaView/type";
import { IonContent, IonPage } from "@ionic/react";
import ArrowBack from "../../components/ArrowBack";

const items: Media[] = [
  {
    type: "video",
    src: "https://cdn-useast1.kapwing.com/teams/66d02f84c6bd60d470fa78c1/jobs/66d03c088fb3458ee6d5999d/final_66d030dcd82c876254b328af_266394.mp4?GoogleAccessId=prod-sa-videoprocessing%40kapwing-prod.iam.gserviceaccount.com&Expires=1724951727&Signature=U8ygiAJvYpbBlewapMHrzaExgCmffWkKOGb5F0QANQlhXiPPkMr8H3yiN4stLaAZxUJBDn6q3T2wg5UoJqiu2vMyhrf1jWBZEU3mb%2Fa6BJfpc3%2BlJzv3AfRkLIST2f1tbNgldOT1a33aQewYPspI7ZVy0mjXk2RiVz2DK3pmYijjkNP8siCRlKc2CN7j8UPG6AX9N9z4OZVcEW1HQp7CTlOpePKe9bz5NJcR2doOMPiqliD1FChtentgqgbA5JP5AXTSwz6OdtXrZCxcjrldaXvpw6Ha1bAOsfVlYU83DoDUPDkHRGrJkfEwvFnIBZNQcjydNwl%2BcchVrd18SACnQw%3D%3D#t=0.01",
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
  const [index, setIndex] = useState(0);

  const handleIndexChange = (i: number) => {
    setIndex(i);
  };

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className="flex justify-center h-full">
          <ArrowBack />
          <span className="absolute top-5 right-4">
            {index + 1}/{items.length}
          </span>
          <MediaView
            items={items}
            handleIndexChange={(index) => handleIndexChange(index)} // Correctly pass the function reference
          ></MediaView>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default EventMediaView;
