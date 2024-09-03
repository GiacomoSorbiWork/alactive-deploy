import React, { useState } from "react";
import EventCard from "../../components/EventCard";
import HostCard from "../../components/HostCard";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import FooterBar from "../../components/FooterBar";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__/gql";
import { AccessPolicy, Event, Host } from "../../__generated__/graphql";
import moment from "moment";

const QUERY_LIKED = gql(`
  query liked {
    me {
      authID
      likes {
        id
        ... on Event {
          name
          media
          datetime
          accessPolicies {
            minPrice
            currency
          }
          hostedAt {
            avatar
            municipality
          }
        }
        ... on Host {
          name
          avatar
        }
      }
    }
  }
`);

const Favorite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const { data } = useQuery(QUERY_LIKED);

  const extractMinPrice = (policies: AccessPolicy[]) => {
    const policy = policies.reduce((min, policy) => {
      const minPrice = parseFloat(policy.minPrice);
      return minPrice < min.minPrice
        ? { minPrice: minPrice, currency: policy.currency } 
        : min
    }, { minPrice: Infinity, currency: '' });

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: policy.currency,
        maximumFractionDigits: 0
    }).format(Math.round(policy.minPrice));
  }

  return (
    <IonPage>
      <IonHeader>
        <h2 className="text-[24px] mt-5 font-bold mb-3 text-white text-center m-3">
          Favorites
        </h2>
        <div className="mt-0">
          <div className="flex">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleTabClick(0)}
                className={`text-body-medium font-medium py-1 px-4 ${
                  activeTab === 0
                    ? " text-activeButton"
                    : "text-white text-opacity-65"
                } focus:outline-none`}
              >
                Events
              </button>
              {activeTab === 0 && (
                <span className="w-14 h-[2px] bg-[var(--secondary-color)]"></span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleTabClick(1)}
                className={`text-body-medium font-medium py-1 px-4 ${
                  activeTab === 1
                    ? "text-activeButton"
                    : "text-white text-opacity-65"
                } focus:outline-none`}
              >
                Hosts
              </button>
              {activeTab === 1 && (
                <span className="w-14 h-[2px] bg-[var(--secondary-color)]"></span>
              )}
            </div>
          </div>
        </div>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className="p-4 text-white overflow-y-auto mb-[75px]">
          {activeTab === 0 && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data && data.me.likes
                  .filter((liked): liked is Event => { return liked.__typename === "Event" })
                  .map(event => (
                    <EventCard 
                      key={event.id}
                      imgUrl={event.media[0]}
                      title={event.name}
                      date={moment(event.datetime).format('D MMM')}
                      location={event.hostedAt.municipality}
                      price={`FROM ${extractMinPrice(event.accessPolicies)}`}
                      // TODO: Address optional unwrapping once we know whether avatar is always present.
                      titleLogo={event.hostedAt.avatar}
                    />
                  ))
                }
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="flex flex-col gap-4">
              {data && data.me.likes
                .filter((liked): liked is Host => { return liked.__typename == "Host" })
                .map(host => (
                  <HostCard
                    key={host.id}
                    imgUrl={host.avatar ?? ''}
                    title={host.name}
                    subTitle="Nightclub"
                  />
                ))
              }
            </div>
          )}
        </div>
        <FooterBar></FooterBar>
      </IonContent>
    </IonPage>
  );
};

export default Favorite;
