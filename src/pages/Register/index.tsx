import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import arrowBack from "../../../resources/arrow back.svg";
import Form from "../../components/Form";
import Card from "../../components/Card";
import SelectList from "../../components/SelectList";
import RangeSlider from "../../components/DataRanger";
import {
  LargeDefaultButton,
  LargeDisabledButton,
} from "../../subComponents/Buttons";

const Register: React.FC = () => {
  const favoriteList: Array<string> = [
    "Commercial",
    "House",
    "Reggaeton",
    "EDM",
    "Techno",
    "Bass Music",
  ];

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [isCard, setIsCard] = useState<boolean>(false);
  const [rangeValue, setRangeValue] = useState<number[]>([80, 2000]);

  const history = useHistory();

  useEffect(() => {
    setIsCard(step === 5);
  }, [step]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };

  const handleBack = useCallback((): void => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  const handleNext = useCallback((): void => {
    if (step >= 7) {
      history.push("/dashboard");
    } else {
      const isEmailValid = email.trim() !== "" && isSubscribed;
      const isNameValid = name.trim() !== "";
      const isUserNameValid = userName.trim() !== "" && userName.length <= 15;
      const isDateValid = date !== null;

      const isFormValid =
        (step === 1 && isEmailValid) ||
        (step === 2 && isNameValid) ||
        (step === 3 && isDateValid) ||
        (step === 4 && isUserNameValid) ||
        step >= 5; // Allow progression from steps 5+ even without validation

      if (!isFormValid) {
        alert(
          "Please fill out all fields correctly and accept the subscription."
        );
        return;
      }
      setStep((prevStep) => prevStep + 1);
    }
  }, [step, email, name, userName, date, isSubscribed]);

  const isActive = useCallback((): boolean => {
    const isEmailValid = email.trim() !== "" && isSubscribed;
    const isNameValid = name.trim() !== "";
    const isUserNameValid = userName.trim() !== "" && userName.length <= 15;
    const isDateValid = date !== null;

    return (
      (step === 1 && isEmailValid) ||
      (step === 2 && isNameValid) ||
      (step === 3 && isDateValid) ||
      (step === 4 && isUserNameValid) ||
      step >= 5
    );
  }, [step, email, name, userName, date, isSubscribed]);

  const handleSelectFavorite = (item: string) => {
    console.log("Selected favorite: ", item);
  };

  return (
    <>
      <ProgressBar progress={step} />
      {isCard && step !== 6 ? (
        <div className="p-4">
          <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px]">
            Choose which events you would attend
          </h1>
        </div>
      ) : (
        <img
          src={arrowBack}
          alt="Back"
          className="cursor-pointer my-6"
          onClick={handleBack}
        />
      )}
      <div className={`border-bottom p-4 pb-8 pt-0 flex flex-col`}>
        {step === 1 && (
          <Form
            title="What’s your email?"
            label="Email Address"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            isSubscribed={isSubscribed}
            handleSubscribed={setIsSubscribed}
          />
        )}
        {step === 2 && (
          <Form
            title="My Name is"
            label="Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            visibleCheckboxes={false}
          />
        )}
        {step === 3 && (
          <Form
            title="My birthday is"
            label="Birthday"
            value={date}
            onChange={() => {}} // Necessary for type safety, but will not be used
            onDateChange={(d: Date | null) => setDate(d)}
            visibleCheckboxes={false}
          />
        )}
        {step === 4 && (
          <Form
            title="Create a username"
            label="Username"
            text="By creating an account, you agree to our Terms. Learn how we collect and use your data in our Data Policy."
            value={userName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
            visibleCheckboxes={false}
          />
        )}
        {step === 5 && (
          <Card
            imgUrl=""
            title="Black Coffee Minimal House Event"
            payBill={30}
            date={new Date()}
          />
        )}
        {step === 6 && (
          <SelectList data={favoriteList} onClick={handleSelectFavorite} />
        )}
        {step === 7 && (
          <div className="mb-[222px]">
            <div className="px-[30px]">
              <h1 className="text-title-large font-bold leading-[120%] tracking-[0.5px]">
                What’s your budget for a night out at a nigthlife event?
              </h1>
            </div>
            <RangeSlider value={rangeValue} onChange={handleChange} />
          </div>
        )}
        {isActive() ? (
          <LargeDefaultButton
            text="Next"
            onClick={handleNext}
            className="mt-6"
          />
        ) : (
          <LargeDisabledButton
            text="Next"
            onClick={handleNext}
            className="mt-6"
          />
        )}
      </div>
    </>
  );
};

export default Register;
