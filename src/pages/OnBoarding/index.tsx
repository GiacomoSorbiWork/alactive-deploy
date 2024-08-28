import React, { useState, ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import Form from "../../components/Form";
import RangeSlider from "../../components/DataRanger";
import EventCard from "../../components/EventCard";
import { LargeDefaultButton, BackButton } from "../../subComponents/Buttons";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import LoadingSpinner from "../../components/Loading";

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

  const handleChange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };

  const handleBack = useCallback((): void => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      history.push("/home");
    }
  }, [step, history]);

  const handleNext = useCallback((): void => {
    const isNameValid = name.trim() !== "";
    const isHandleValid = handle.trim().startsWith("@") && handle.length > 1;
    const isDateValid = date !== null && isValidDate(date);
    const isEventSelected = eventCardSelectedList.length > 1;
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

    if (step === 6)
      setTimeout(() => {
        history.push("/dashboard");
      }, 2000); // simulate loading delay

    setStep((prev) => prev + 1);
    setLastStep((prev) => Math.max(prev, step + 1));
  }, [step, name, handle, date, eventCardSelectedList, favoriteList, history]);

  const isActive = useCallback((): boolean => {
    console.log(date !== null && isValidDate(date));
    return (
      (step === 1 && name.trim() !== "") ||
      (step === 2 && handle.trim().startsWith("@") && handle.length > 1) ||
      (step === 3 && date !== null && isValidDate(date)) ||
      (step === 4 && eventCardSelectedList.length > 1) ||
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
        <IonToolbar />
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
        <div className="p-8 flex flex-col">
          {step === 1 && (
            // <Form
            //   title="Nice to meet you. And your name is?"
            //   label="Your Name"
            //   value={name}
            //   placeholderText="My name is..."
            //   helperText="For example, Stefano Alberto Proietti"
            //   onChange={(e: ChangeEvent<HTMLInputElement>) =>
            //     setName(e.target.value)
            //   }
            // />
            <LoadingSpinner />
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
              <div className="">
                <EventCard
                  videoUrl="https://s3-figma-videos-production-sig.figma.com/video/1267800981591854695/TEAM/08d0/bd09/-14c7-44ca-b923-a3436e290c96?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aMMwUnH5kfSTj56rB5Rp3RjRyLnTSo11ugDGbxe410xllYK5LNQ0wzQKhsgXmsvzU5PGvMST8QEzsxY086~pZcPYMqIkhj0UOKkCK4I1PSH6YW59FI3~OKAFxDrh7H6E5DoCgFw0Dsg4DD~ovArSwsF3JywwyzL-WNrUwfuLhwHYIDC14Y9P3RPXey0Urk1ERbR6gXLrB94JluZZqsjvqGtERIZqPS1vxPpGbQ-C4J58kgmm7qVfiUugqW5jjbPkkXDBFF~KFj1ziiZxfC1tDnJzqiz1V6gTd3cTlD-kI86GEzd9rSbGalJ0qEyxIGBn5C4B7fycA43vK-4KA2sB~A__"
                  title="Black Coffee Minimal House Event"
                  date="30/05/2024"
                  location="New York, NY"
                  price="200"
                  purpose="Registration"
                  isChecked={eventCardSelectedList.includes("black001")}
                  selectFunc={handleSelectedEvent}
                  cardId="black001"
                  musicType="Commerical"
                />
                <EventCard
                  imgUrl="https://t3.ftcdn.net/jpg/07/40/76/48/240_F_740764831_GIRbum3PNYK0bKMOGXjoOPBhnaBkWNzo.jpg"
                  title="Black Coffee Minimal House Event"
                  date="30/05/2024"
                  location="New York, NY"
                  price="200"
                  purpose="Registration"
                  isChecked={eventCardSelectedList.includes("black002")}
                  selectFunc={handleSelectedEvent}
                  cardId="black002"
                  musicType="Hip-Hop"
                />
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
                    className={`border border-solid border-white ${
                      !favoriteList.includes(music)
                        ? "bg-transparent "
                        : "bg-[var(--secondary-color)] "
                    } rounded-big p-2`}
                    onClick={() => toggleFavorite(music)}
                  >
                    {music}
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
              <div className="mt-[25vh]">
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
