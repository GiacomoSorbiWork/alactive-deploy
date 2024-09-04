import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Divider,
  Box,
} from "@mui/material";
import FooterBar from "../../components/FooterBar";
import { ProfileType, ProfileListType } from "./type";
import LogOutSVG from "../../../resources/svg/exit-to-app-rounded.svg";
import BirthSVG from "../../../resources/svg/gift.svg";
import HammerSVG from "../../../resources/svg/hammer.svg";
import DocumentSVG from "../../../resources/svg/document.svg";
import RecycleSVG from "../../../resources/svg/recycle.svg";
import ArrowRightSVG from "../../../resources/svg/arrow-right.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { gql, useMutation, useQuery } from "@apollo/client";

const QUERY_ME = gql`
  query me {
    me {
      handle
      name
      avatar
      birthday
    }
  }
`;

const MUTATION_DELETE = gql`
  mutation deleteAccount {
    deleteMe
  }
`;

const ProfileList: React.FC<ProfileListType> = ({
  img,
  title,
  text,
  type,
  arrowVisible = false,
  onClick,
}) => (
  <div
    className="flex items-center justify-between w-full pb-2 pt-4 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex">
      <img src={img} alt="icon" />
      <div className="flex ml-4">
        <p
          className={`text-body-small font-bold ${
            type === "delete" ? "text-[#ff8578]" : "text-white"
          }`}
        >
          {title}
          {text && ":"}
        </p>
        <p className="text-body-small ml-1">{text}</p>
      </div>
    </div>
    {arrowVisible && <img src={ArrowRightSVG} alt="arrow" />}
  </div>
);

const Profile: React.FC<ProfileType> = () => {
  const { logout } = useAuth0();

  const [open, setOpen] = useState(false);
  // const [birth, setBirth] = useState(dayjs(data?.me?.birthday));
  const [selectBirthVisible, setSelectBirthVisible] = useState(false); // Control visibility of the DatePicker

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    useMutation(MUTATION_DELETE);

    // TODO: I have no idea how to delete an Auth0 account here.
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const { loading, error, data } = useQuery(QUERY_ME);

  return (
    <IonPage>
      <IonContent scrollY={false} fullscreen>
        <div
          className="relative w-full h-1/2 overflow-hidden bg-cover bg-center text-white"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.6) 100%), url(${data?.me?.avatar})`,
          }}
        >
          <Box className="absolute bottom-7 text-white p-4 w-full">
            <p className="text-title-medium font-semibold w-5/6 leading-snug">
              {data?.me?.name}
            </p>
            <p className="text-body-small mt-2">@{data?.me?.handle}</p>
          </Box>
        </div>
        <div className="text-white px-4 rounded-t-rounded relative mt-[-35px] bg-primaryContainer pb-[75px]">
          <ProfileList
            img={BirthSVG}
            title="Date of Birth"
            text={loading ? "Loading..." : error ? "Error" : data?.me?.birthday} // Format the birthday for display
            arrowVisible
            onClick={() => {
              setSelectBirthVisible(true); // Show the Date Picker
            }}
          />

          {/* <div className="hidden">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  open={selectBirthVisible}
                  value={birth}
                  onChange={(newValue) => {
                    setBirth(dayjs(newValue)); // Set the new birth date directly
                  }}
                  onClose={() => setSelectBirthVisible(false)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div> */}

          <p className="text-title-small mt-2 font-bold">Boring Stuff</p>
          <Divider className="!border-white h-0 opacity-20" />
          <ProfileList img={HammerSVG} title="Terms of Service" />
          <ProfileList img={DocumentSVG} title="Privacy Policy" />
          <ProfileList img={LogOutSVG} title="Log out" onClick={logout} />
          <p className="text-title-small mt-2 font-bold">Danger Zone</p>
          <Divider className="!border-white h-0 opacity-20" />
          <ProfileList
            img={RecycleSVG}
            title="Delete Account"
            type="delete"
            onClick={handleOpen}
          />
        </div>
        <FooterBar />
      </IonContent>

      {/* Account Deletion Confirmation Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.95) !important",
            padding: "16px !important",
          },
          "& .MuiTypography-root": {
            color: "black !important",
          },
        }}
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you delete your account, all of its data will be deleted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="!rounded-rounded !border !border-solid !border-[var(--secondary-container-color)] !text-black !normal-case"
          >
            Go back
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            className="!rounded-rounded !bg-[#FF8578] !text-black !normal-case"
          >
            {"I'm sure"}
          </Button>
        </DialogActions>
      </Dialog>
    </IonPage>
  );
};

export default Profile;
