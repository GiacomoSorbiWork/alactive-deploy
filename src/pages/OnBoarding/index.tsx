import React, { useState, ChangeEvent, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import Form from "../../components/Form";
import RangeSlider from "../../components/DataRanger";
import EventCard from "../../components/EventCard";
import { LargeDefaultButton, BackButton } from "../../subComponents/Buttons";
import { IonContent, IonFooter, IonHeader, IonPage } from "@ionic/react";
import LoadingSpinner from "../../components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { eventCardsData } from "./data";
// import { useQuery, useMutation } from "@apollo/client";
// import { RecommendMe, SetLike } from "../../API/Graphql/queries";

// interface UserdataType {
//   name: string;
//   handle: string;
//   dob: string;
//   musicPreferences: string[];
//   favoriteEvents: string[];
//   budget: number;
// }

const OnBoarding: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [lastStep, setLastStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [handle, setHandle] = useState<string>("@");
  const [date, setDate] = useState<Date | null>(null);
  const [rangeValue, setRangeValue] = useState<number[]>([80, 2000]);
  const [eventCardSelectedList, setEventCardSelectedList] = useState<string[]>(
    []
  );
  const [favoriteList, setFavorite] = useState<string[]>([]);
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
  const history = useHistory();
  const { user } = useAuth0();
  // const { data, error } = useQuery(RecommendMe);
  // if (error) {
  //   console.error("Error in query:", error);
  // }
  // const [createUser] = useMutation(SetLike);

  useEffect(() => {
    interface User {
      name: string;
    }
    const userInfo = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = userInfo.find((item: User) => item.name === user?.name);

    if (foundUser) {
      history.push("/dashboard");
    }
  });

  const handleChange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };

  const handleBack = useCallback((): void => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      history.push("/login");
    }
  }, [step, history]);

  // const handleOnboardingSubmit = async (userData: UserdataType) => {
  //   if (!data?.doIExist) {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       await createUser({
  //         variables: { input: userData },
  //         context: {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       });
  //       // Handle success (e.g., navigate to a different page)
  //     } catch (error) {
  //       console.error("Error creating user:", error);
  //       // Handle error (e.g., show error message)
  //     }
  //   }
  // };

  const handleNext = useCallback((): void => {
    const isNameValid = name.trim() !== "";
    const isHandleValid = handle.trim().startsWith("@") && handle.length > 1;
    const isDateValid = date !== null && isValidDate(date);
    const isEventSelected = eventCardSelectedList.length >= 1;
    const isFavoriteSelected = favoriteList.length > 0;

    const isFormValid =
      (step === 1 && isNameValid) ||
      (step === 2 && isHandleValid) ||
      (step === 3 && isDateValid) ||
      (step === 4 && isEventSelected) ||
      (step === 5 && isFavoriteSelected) ||
      step === 6;

    if (!isFormValid) {
      alert("Please fill out all fields correctly.");
      return;
    }

    if (step === 6) {
      // const userdata = {
      //   name: name,
      //   handle: handle,
      //   dob: date!.toISOString(),
      //   musicPreferences: eventCardSelectedList,
      //   favoriteEvents: favoriteList,
      //   budget: rangeValue[1],
      // };
      // handleOnboardingSubmit(userdata);

      setTimeout(() => {
        try {
          const userInfo = JSON.parse(localStorage.getItem("users") || "[]");

          if (Array.isArray(userInfo) && userInfo.length > 0) {
            const tempUser = { ...user, userName: name, handle: handle };
            userInfo.push(tempUser);

            localStorage.setItem("users", JSON.stringify(userInfo));
          }

          history.push("/dashboard");
        } catch (error) {
          console.error("Error updating user information:", error);
          // Handle the error appropriately (e.g., show an error message to the user)
        }
      }, 1000);
    }
    setStep((prev) => prev + 1);
    setLastStep((prev) => Math.max(prev, step + 1));
  }, [step, name, handle, date, eventCardSelectedList, favoriteList, history]);

  const isActive = useCallback((): boolean => {
    return (
      (step === 1 && name.trim() !== "") ||
      (step === 2 && handle.trim().startsWith("@") && handle.length > 1) ||
      (step === 3 && date !== null && isValidDate(date)) ||
      (step === 4 && eventCardSelectedList.length >= 1) ||
      (step === 5 && favoriteList.length > 0) ||
      step === 6
    );
  }, [step, name, handle, date, eventCardSelectedList, favoriteList]);

  const isValidDate = (date: Date): boolean => {
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

  const handleSelectedEvent = (selectedItem?: string): void => {
    if (!selectedItem) return;

    setEventCardSelectedList((prevList) => {
      if (prevList.includes(selectedItem)) {
        return prevList.filter((item) => item !== selectedItem);
      } else {
        return [...prevList, selectedItem];
      }
    });
  };

  const toggleFavorite = (music: string) => {
    setFavorite((prevList) =>
      prevList.includes(music)
        ? prevList.filter((item) => item !== music)
        : [...prevList, music]
    );
  };

  const handleHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith("@")) {
      setHandle(value);
    } else {
      setHandle("@" + value);
    }
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
      <IonContent>
        <div className="p-8 flex flex-col h-full">
          {step === 1 && (
            <Form
              title="Nice to meet you. And your name is?"
              label="Your Name"
              value={name}
              placeholderText="My name is..."
              helperText="For example, Stefano Alberto Proietti"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          )}
          {step === 2 && (
            <Form
              title="Great. What will your username be?"
              label="Your Handle"
              value={handle}
              placeholderText="My handle is..."
              helperText="For example, @stefano"
              onChange={handleHandleChange}
            />
          )}
          {step === 3 && (
            <Form
              title="Nice. When do we send you a gift?"
              label="Birthday"
              helperText="Your birthday will not be public, and we will only use it to confirm your age."
              value={date}
              onDateChange={setDate}
              visibleCheckboxes={false}
            />
          )}
          {step === 4 && (
            <>
              <div className="overflow-y-auto snap-y snap-mandatory scroll-smooth h-full">
                {eventCardsData.map((event) => (
                  <EventCard
                    key={event.id}
                    videoUrl={event.videoUrl}
                    imgUrl={event.imgUrl}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    price={event.price}
                    purpose={event.purpose}
                    isChecked={eventCardSelectedList.includes(event.id)}
                    selectFunc={handleSelectedEvent}
                    cardId={event.id}
                    musicType={event.musicType}
                    className="!h-[calc(100%-85px)]"
                  />
                ))}
              </div>
            </>
          )}
          {step === 5 && (
            <div>
              <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px] mb-8">
                {"What kind of music do you like?"}
              </h1>
              <div className="flex flex-wrap gap-3">
                {musicList.map((music, index) => (
                  <button
                    key={"music-" + index}
                    className={`border-2 border-solid border-white px-3 py-1 ${
                      !favoriteList.includes(music)
                        ? "bg-transparent"
                        : "bg-[var(--secondary-color)]"
                    } rounded-[20px] p-2`}
                    onClick={() => toggleFavorite(music)}
                  >
                    <span className="text-body-medium font-bold">{music}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 6 && (
            <div>
              <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px]">
                {"What’s your budget for a night out at a nightlife event?"}
              </h1>
              <RangeSlider value={rangeValue} onChange={handleChange} />
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
              state={isActive() ? "isActive" : "disabled"}
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
              state={isActive() ? "isActive" : "disabled"}
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
