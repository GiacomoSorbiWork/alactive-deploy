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

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [lastStep, setLastStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
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
  }, [step]);

  const handleNext = useCallback((): void => {
    const isNameValid = name.trim() !== "";
    const isHandleValid = handle.trim().startsWith("@");
    const isDateValid = date !== null;
    const isEventSelected = eventCardSelectedList.length > 0;
    const isFavoriteSelected = favoriteList.length > 0;

    const isFormValid =
      (step === 1 && isNameValid) ||
      (step === 2 && isHandleValid && handle.length > 1) ||
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
        history.push("/home");
      }, 2000); // simulate loading delay
    setStep((prev) => prev + 1);
    setLastStep((prev) => Math.max(prev, step + 1));
  }, [step, name, handle, date, eventCardSelectedList, favoriteList]);

  const isActive = useCallback((): boolean => {
    return (
      (step === 1 && name.trim() !== "") ||
      (step === 2 && handle.trim().startsWith("@") && handle.length > 1) ||
      (step === 3 && date !== null) ||
      (step === 4 && eventCardSelectedList.length > 0) ||
      (step === 5 && favoriteList.length > 0) ||
      step === 6
    );
  }, [step, name, handle, date, eventCardSelectedList, favoriteList]);

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar />
      </IonHeader>
      <IonContent>
        {step < 7 && <ProgressBar progress={step} />}
        <div className="p-8 flex flex-col">
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHandle(e.target.value)
              }
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
              <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px]">
                Choose which events you would attend
              </h1>
              <EventCard
                imgUrl="https://t4.ftcdn.net/jpg/08/19/24/63/240_F_819246328_2nfWzjhKYjhnl1yURFR0NL1oToq8FDnn.jpg"
                title="Black Coffee Minimal House Event"
                date="30/05/2024"
                location="New York, NY"
                price="200"
                purpose="Registration"
                isChecked={eventCardSelectedList.includes(
                  "Black Coffee Minimal House Event"
                )}
                selectFunc={handleSelectedEvent}
                cardId="Black Coffee Minimal House Event"
              />
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
            </div>
          )}
        </div>
      </IonContent>
      <IonFooter class="p-4">
        {step < 7 && (
          <div className="flex items-center mt-6 gap-2">
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

export default Register;
