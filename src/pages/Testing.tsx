import React from "react";
import {
  LargeDefaultButton,
  LargeDisabledButton,
  LargeIconButton,
  SmallDefaultButton,
  SmallDisabledButton,
  SmallIconButton,
  SmallDisabledIconButton,
  TextOnlyButton,
  RoundedButton,
} from "../subComponents/Buttons";
const Testing = () => {
  return (
    <div>
      <LargeDefaultButton />
      <LargeDisabledButton />
      <LargeIconButton />
      <SmallDefaultButton />
      <SmallDisabledButton />
      <SmallIconButton />
      <SmallDisabledIconButton />
      <TextOnlyButton />
      <RoundedButton />
    </div>
  );
};

export default Testing;
