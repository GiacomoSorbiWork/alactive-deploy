import React, { useState } from "react";
import MediaView from "../../components/MediaView";
import { Media } from "../../components/MediaView/type";
import { IonContent, IonPage } from "@ionic/react";
import ArrowBack from "../../components/ArrowBack";
import { gql } from "../../__generated__";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";

const QUERY_VENUEMEDIA= gql(`
    query MediaVenue($id: ID!) {
      venue(id: $id) {
        highlights {
          title
          videos
        }
      }
    }
  `);



const HighlightsView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { highlightTitle } = useParams<{ highlightTitle: string }>();

    const { loading, data } = useQuery(QUERY_VENUEMEDIA, { variables: { id } });

    const [index, setIndex] = useState(0);

    const handleIndexChange = (i: number) => {
        setIndex(i);
     };

    const highlight = data?.venue?.highlights.find(
    (item: { title: string }) => item.title === highlightTitle
    );
    
    // Verifica se ci sono video e crea gli items
    const items: Media[] = highlight?.videos?.map((video: string) => ({
    id: "video",
    video: video,
    })) || [];

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
export default HighlightsView;
