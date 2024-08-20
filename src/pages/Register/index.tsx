import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import arrowBack from "../../../resources/arrow back.svg";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Card from "../../components/Card";
import SelectList from "../../components/SelectList";
import RangeSlider from "../../components/DataRanger";

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

  useEffect(() => {
    setIsCard(step === 5);
  }, [step]);

  const handleBack = useCallback((): void => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  const handleNext = useCallback((): void => {
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
        <div className="p-3">
          <h1 className="text-4xl font-bold leading-tight tracking-wide text-white">
            Choose which events you would attend
          </h1>
        </div>
      ) : (
        <img
          src={arrowBack}
          alt="Back"
          className="cursor-pointer mt-6"
          onClick={handleBack}
        />
      )}
      <div
        className={`border-bottom p-2 flex flex-col justify-between ${
          isCard || step > 4 ? (step !== 5 ? "h-[95%]" : "h-[80%]") : "h-[52%]"
        }`}
      >
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
          <div className="mt-7">
            <div className="px-[32px]">
              <h1 className="text-4xl font-bold leading-tight tracking-wide text-white">
                What’s your budget for a night out at a nigthlife event?
              </h1>
            </div>
            <RangeSlider />
          </div>
        )}
        <Button text="Next" isActive={isActive()} onClick={handleNext} />
      </div>
    </>
  );
};

export default Register;
