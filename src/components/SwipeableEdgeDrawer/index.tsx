import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
import Button from "../Button";
import Search from "@mui/icons-material/Search";
import { Dayjs } from "dayjs";

// Constants
const drawerBleeding = 56;

const Root = styled("div")({
  height: "100%",
  width: "100%",
  position: "relative",
  backgroundColor: "var(--primary-background-color)",
  overflow: "hidden", // Prevents scrolling when interacting with drawer
});

const StyledBox = styled(Box)({
  backgroundColor: "var(--primary-background-color)",
  position: "absolute",
  top: -drawerBleeding,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  right: 0,
  left: 0,
  borderRadius: "30px 30px 0px 0px",
});

const Puller = styled("div")({
  width: 30,
  height: 6,
  backgroundColor: "#4A4A4A",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
});

const useTouchToOpenDrawer = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const startY = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      startY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (startY.current === null) return;
      const currentY = event.touches[0].clientY;
      const diff = startY.current - currentY;
      if (diff > 30) {
        setOpen(true);
        startY.current = null;
      }
    };

    const handleTouchEnd = () => {
      startY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [setOpen]);
};

const SwipeableEdgeDrawer: React.FC<{ window?: () => Window }> = ({
  window,
}) => {
  const [open, setOpen] = useState(false);
  const container = window ? window().document.body : undefined;
  const [openComponent, setOpenComponent] = useState<string | null>(null);

  const [location, setLocation] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
  const [budget, setBudget] = useState<number[]>([80, 2000]);

  const handleToggle = (componentName: string) => {
    setOpenComponent((prevComponent) =>
      prevComponent === componentName ? null : componentName
    );
  };

  useTouchToOpenDrawer(setOpen);

  const handleToggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    []
  );

  const handleNext = () => {
    // Perform the search action
    console.log("Search with filters", {
      location,
      selectedMonth,
      selectedYear,
      budget,
    });
  };

  const handleClearFilters = () => {
    setLocation("");
    setSelectedMonth(null);
    setSelectedYear(null);
    setBudget([80, 2000]);
  };

  const globalStyles = useMemo(
    () => css`
      .MuiDrawer-root > .MuiPaper-root {
        height: calc(80% - ${drawerBleeding}px);
        overflow: visible;
      }
    `,
    []
  );

  return (
    <Root>
      <Global styles={globalStyles} />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={handleToggleDrawer(false)}
        onOpen={handleToggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: true }} // Keeps the drawer mounted for better performance
      >
        <StyledBox>
          <Puller />
          <Typography
            sx={{ p: 2, color: "white" }}
            className="text-center flex justify-between !p-[18px]"
          >
            <img src={CloseSVG} alt="" />
            <span className="text-[20px] font-semibold tracking-[1px] m-2.5 block">
              Filters
            </span>
            <span className="w-4"></span>
          </Typography>
          <Divider className="!border-white h-0 opacity-20" />
        </StyledBox>
        <Box
          sx={{
            marginTop: "30px",
            height: "100%",
            overflow: "auto",
            backgroundColor: "var(--primary-background-color)",
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
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <Divider className="!border-white h-0 opacity-20" />
          <Budget
            isOpen={openComponent === "Budget"}
            onToggle={() => handleToggle("Budget")}
            value={budget}
            onChange={setBudget}
          />
        </Box>
        <Divider className="!border-white h-0 opacity-20" />
        <IonFooter className="bg-[var(--primary-background-color)] h-[70px] px-[20px] py-[10px] flex items-center justify-between">
          <p onClick={handleClearFilters} className="text-white cursor-pointer">
            Clear Filters
          </p>
          <Button
            text="Search"
            isActive={true}
            onClick={handleNext}
            svg={Search}
          />
        </IonFooter>
      </SwipeableDrawer>
    </Root>
  );
};

export default SwipeableEdgeDrawer;
