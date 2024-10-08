import React, { useState, useEffect, useMemo } from "react";
import { IonFooter } from "@ionic/react";
import { Global, css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import CloseSVG from "../../../resources/svg/close.svg";
import Location from "../Filter/location";
import When from "../Filter/when";
import Budget from "../Filter/budget";
import { Dayjs } from "dayjs";
import { LargeIconButton } from "../../subComponents/Buttons";

// Constants
const drawerBleeding = 56;

const StyledBox = styled(Box)({
  background: "#232323",
  position: "absolute",
  top: -drawerBleeding,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  right: 0,
  left: 0,
  borderRadius: "30px 30px 0px 0px",
});

const Puller = styled("div")({
  width: 50,
  height: 6,
  backgroundColor: "#4A4A4A",
  borderRadius: 3,
  position: "absolute",
  top: 10,
  left: "calc(50% - 25px)",
});

const SwipeableEdgeDrawer: React.FC<{
  window?: () => Window;
  onClose?: () => void;
  openState?: boolean;
}> = ({ window, openState = false, onClose }) => {
  const [open, setOpen] = useState(false);
  const container = window ? window().document.body : undefined;
  const [openComponent, setOpenComponent] = useState<string | null>(null);

  const [location, setLocation] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
  const [budget, setBudget] = useState<number[]>([80, 2000]);

  const handleToggle = (componentName: string) => {
    setOpenComponent((prevComponent) =>
      prevComponent === componentName ? null : componentName
    );
  };

  useEffect(() => {
    setOpen(openState);
  }, [openState]);

  const handleNext = () => {
    // Perform the search action
    console.log("Search with filters", {
      location,
      selectedMonth: selectedRange,
      selectedYear,
      budget,
    });
  };

  const handleClearFilters = () => {
    setLocation("");
    setSelectedRange([null, null]);
    setSelectedYear(null);
    setBudget([80, 2000]);
  };

  const globalStyles = useMemo(
    () => css`
      .MuiDrawer-root > .MuiPaper-root {
        height: calc(74% - ${drawerBleeding}px);
        overflow: visible;
      }
    `,
    []
  );

  return (
    <div className="h-full w-full relative bg-primary overflow-hidden hidden">
      <Global styles={globalStyles} />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={onClose ?? (() => {})}
        onOpen={() => {}}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: true }} // Keeps the drawer mounted for better performance
      >
        <StyledBox>
          <Puller />
          <Typography
            sx={{ p: 2, color: "white" }}
            className="text-center flex justify-between !p-6 !pt-[50px]"
          >
            <img src={CloseSVG} alt="" onClick={() => setOpen(false)} />
            <span className="font-bold text-title-small tracking-[0.5px] leading-6">
              Filters
            </span>
            <span className="w-4"></span>
          </Typography>
          <Divider className="!border-white h-0 opacity-20" />
        </StyledBox>
        <Box
          sx={{
            marginTop: "43px",
            height: "100%",
            overflow: "auto",
            background: "#232323",
            padding: "0 16px",
          }}
        >
          <Location
            isOpen={openComponent === "Location"}
            onToggle={() => handleToggle("Location")}
            value={location}
            onChange={setLocation}
          />
          <Divider className="!border-white h-0 opacity-20" />
          <When
            isOpen={openComponent === "When"}
            onToggle={() => handleToggle("When")}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
          <Divider className="!border-white h-0 opacity-20" />
          <Budget
            isOpen={openComponent === "Budget"}
            onToggle={() => handleToggle("Budget")}
            value={budget}
            onChange={setBudget}
          />
        </Box>
        <IonFooter className="bg-filterContainer px-8 py-4 flex items-center justify-between text-white border-t border-white border-opacity-20">
          <p
            className="font-bold text-body-medium"
            onClick={handleClearFilters}
          >
            Clear Filters
          </p>
          <LargeIconButton onClick={handleNext} text="Search"></LargeIconButton>
        </IonFooter>
      </SwipeableDrawer>
    </div>
  );
};

export default SwipeableEdgeDrawer;
