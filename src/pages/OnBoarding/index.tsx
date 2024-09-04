import React, { useState, ChangeEvent, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import Form from "../../components/Form";
import RangeSlider from "../../components/DataRanger";
import EventCard from "../../components/EventCard";
import { LargeDefaultButton, BackButton } from "../../subComponents/Buttons";
import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import LoadingSpinner from "../../components/Loading";
import { gql } from "../../__generated__";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { AccessPolicy } from "../../__generated__/graphql";

interface UserInputType {
  name: string;
  acceptMarketing: boolean;
  handle: string;
  dob: Date | null;
  budget: number[];
  musicGenres: string[];
  favoriteEventIDs: string[];
}

const musicList = [
  "Commercial",
  "Reggaeton",
  "Hip-Hop",
  "EDM",
  "House",
  "Techno",
  "Bass Music",
  "Tech-House",
  "Afro-House",
  "Trance",
  "Big Room",
];

const QUERY_GET_EVENTS = gql(`
  query GetOnboardingEvents {
    recommendMe {
      id
      name
      video
      datetime
      accessPolicies {
        minPrice
        currency
      }
      hostedAt {
        municipality
      }
      musicGenres
    }
  }
`);

const MUTATION_CREATE_USER = gql(`
  mutation CreateUser($handle: String!, $name: String!, $birthday: LocalDate!) {
    createUser(handle: $handle, name: $name, birthday: $birthday, links: []) {
      authID
    }
  }
`);

const MUTATION_LIKE_EVENT = gql(`
  mutation LikeEvent($target: String!) {
    setLike(target: $target, like: true) {
      authID
    }
  }
`);

const OnBoarding: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [lastStep, setLastStep] = useState<number>(1);

  const [userInput, setUserInput] = useState<UserInputType>({
    name: "",
    acceptMarketing: false,
    handle: "@",
    dob: null,
    budget: [0, 50],
    musicGenres: [],
    favoriteEventIDs: [],
  });

  const history = useHistory();

  const { data: eventsData } = useQuery(QUERY_GET_EVENTS);

  const [createUser] = useMutation(MUTATION_CREATE_USER, {
    variables: {
      handle: userInput.handle.slice(1),
      name: userInput.name,
      birthday:
        userInput.dob && !isNaN(userInput.dob.getTime())
          ? userInput.dob.toISOString().split("T")[0]
          : "",
    },
  });

  const [likeEvent] = useMutation(MUTATION_LIKE_EVENT);

  const isValidDob = (date: Date): boolean => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();
    const dayDifference = today.getDate() - date.getDate();
    return (
      (age > 18 && age < 100) ||
      (age === 18 &&
        (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
    );
  };

  const isActive = useMemo(
    () =>
      (step === 1 && userInput.name.trim() !== "") ||
      (step === 2 &&
        userInput.handle.trim().startsWith("@") &&
        userInput.handle.length > 1 &&
        /^[A-Za-z0-9._-]+$/.test(userInput.handle.slice(1))) ||
      (step === 3 && userInput.dob !== null && isValidDob(userInput.dob)) ||
      (step === 4 && userInput.favoriteEventIDs.length > 0) ||
      (step === 5 && userInput.musicGenres.length > 0) ||
      step === 6,
    [step, userInput]
  );

  const handleBack = useCallback(
    () => (step > 1 ? setStep(step - 1) : history.push("/login")),
    [step, history]
  );

  const handleNext = useCallback(async (): Promise<void> => {
    if (!isActive) {
      alert("Please fill out all fields correctly.");
      return;
    }

    if (step === 6) {
      await createUser();
      userInput.favoriteEventIDs.forEach((eventID) => {
        likeEvent({ variables: { target: eventID } });
      });

      history.push("/dashboard");
      alert("Remember to like events to improve your recommendations!");
    }

    setStep((prev) => prev + 1);
    setLastStep((prev) => Math.max(prev, step + 1));
  }, [step, history, isActive]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput((prev) => ({ ...prev, name: e.target.value }));
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput((prev) => ({
      ...prev,
      handle: value.startsWith("@") ? value : "@" + value,
    }));
  };

  const onDobChange = (date: Date | null) => {
    setUserInput((prev) => ({ ...prev, dob: date }));
  };

  const onSelectEvent = (selectedItem?: string) => {
    if (!selectedItem) return;

    setUserInput((prev) => ({
      ...prev,
      favoriteEventIDs: prev.favoriteEventIDs.includes(selectedItem)
        ? prev.favoriteEventIDs.filter((item) => item !== selectedItem)
        : [...prev.favoriteEventIDs, selectedItem],
    }));
  };

  const onToggleMusicGenre = (genre: string) => {
    setUserInput((prev) => ({
      ...prev,
      musicGenres: prev.musicGenres.includes(genre)
        ? prev.musicGenres.filter((item) => item !== genre)
        : [...prev.musicGenres, genre],
    }));
  };

  const onBudgetChange = (event: Event, newValue: number | number[]) => {
    setUserInput((prev) => ({ ...prev, budget: newValue as number[] }));
  };

  return (
    <IonPage>
      <IonHeader>
        {step < 7 && <ProgressBar progress={step} />}
        {step === 4 && (
          <div className="p-8 pb-0 flex flex-col">
            <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px]">
              Choose which events you would attend
            </h1>
          </div>
        )}
      </IonHeader>
      <IonContent scrollY={false} className="bg-black">
        <div className="p-8 flex flex-col h-full bg-black">
          {step === 1 && (
            <Form
              title="Nice to meet you. And your name is?"
              label="Your Name"
              value={userInput.name}
              placeholderText="My name is..."
              helperText="For example, Stefano Alberto Proietti"
              onChange={onNameChange}
            />
          )}
          {step === 2 && (
            <Form
              title="Great. What will your username be?"
              label="Your Handle"
              value={userInput.handle}
              placeholderText="My handle is..."
              helperText="For example, @stefano"
              onChange={onHandleChange}
              visibleCheckboxes={false}
            />
          )}
          {step === 3 && (
            <Form
              title="Nice. When do we send you a gift?"
              label="Birthday"
              helperText="Your birthday will not be public, and we will only use it to confirm your age."
              value={userInput.dob}
              onDateChange={onDobChange}
              visibleCheckboxes={false}
            />
          )}
          {step === 4 && (
            <div className="overflow-y-auto snap-y snap-mandatory scroll-smooth h-full">
              {eventsData &&
                eventsData.recommendMe.slice(0, 10).map((event) => {
                  const extractMinPrice = (policies: AccessPolicy[]) => {
                    const policy = policies.reduce(
                      (min, policy) => {
                        const minPrice = parseFloat(policy.minPrice);
                        return minPrice < min.minPrice
                          ? { minPrice: minPrice, currency: policy.currency }
                          : min;
                      },
                      { minPrice: Infinity, currency: "" }
                    );

                    return new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: policy.currency,
                      maximumFractionDigits: 0,
                    }).format(Math.round(policy.minPrice));
                  };

                  return (
                    <EventCard
                      key={event.id}
                      videoUrl={event.video}
                      title={event.name}
                      // date={moment(event.datetime).format("D MMM")}
                      location={event.hostedAt.municipality}
                      price={extractMinPrice(
                        event.accessPolicies as AccessPolicy[]
                      )}
                      purpose="Registration"
                      isChecked={userInput.favoriteEventIDs.includes(event.id)}
                      selectFunc={onSelectEvent}
                      cardId={event.id}
                      musicType={event.musicGenres[0]}
                    />
                  );
                })}
            </div>
          )}
          {step === 5 && (
            <div>
              <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px] mb-8">
                {"What kind of music do you like?"}
              </h1>
              <div className="flex flex-wrap gap-3">
                {musicList.map((musicGenre) => (
                  <button
                    key={musicGenre}
                    className={`border-2 border-solid border-white px-3 py-1 ${
                      !userInput.musicGenres.includes(musicGenre)
                        ? "bg-transparent"
                        : "bg-[var(--secondary-color)]"
                    } rounded-[20px] p-2`}
                    onClick={() => onToggleMusicGenre(musicGenre)}
                  >
                    <span className="text-body-medium font-bold">
                      {musicGenre}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 6 && (
            <div>
              <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px]">
                {"How much would you spend on a night out?"}
              </h1>
              <RangeSlider value={userInput.budget} onChange={onBudgetChange} />
            </div>
          )}
          {step === 7 && (
            <div>
              <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px]">
                All done! Let the fun begin...
              </h1>
              <div className="mt-[10vh]">
                <LoadingSpinner />
              </div>
            </div>
          )}
        </div>
        {step === 4 && (
          <div className="flex items-center p-4 gap-2 bg-black bg-opacity-50 backdrop-blur-sm sticky bottom-0">
            <BackButton onClick={handleBack} />
            <LargeDefaultButton
              text="Continue"
              className="w-full"
              onClick={handleNext}
              state={isActive ? "isActive" : "disabled"}
            />
            {lastStep > step && (
              <BackButton onClick={handleNext} state="noBack isActive" />
            )}
          </div>
        )}
      </IonContent>
      <IonFooter>
        {step < 7 && step != 4 && (
          <div className="flex items-center p-4 gap-2 bg-black bg-opacity-50 backdrop-blur-sm sticky bottom-0">
            <BackButton onClick={handleBack} />
            <LargeDefaultButton
              text="Continue"
              className="w-full"
              onClick={handleNext}
              state={isActive ? "isActive" : "disabled"}
            />
            {lastStep > step && (
              <BackButton onClick={handleNext} state="noBack isActive" />
            )}
          </div>
        )}
      </IonFooter>
    </IonPage>
  );
};

export default OnBoarding;
