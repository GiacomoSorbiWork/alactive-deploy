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
  SelectedButton,
  UnselectedButton,
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
      <SelectedButton />
      <UnselectedButton />
    </div>
  );
};

export default Testing;
