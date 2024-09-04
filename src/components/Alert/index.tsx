import React from "react";
import { createRoot } from "react-dom/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps as MuiAlertProps } from "@mui/material/Alert";

type Severity = "success" | "warning" | "error" | "info";

interface AlertProps {
  message: string;
  type?: Severity;
  autoHideDuration?: number;
}

const showAlert = ({
  message,
  type = "success",
  autoHideDuration = 5000,
}: AlertProps) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  const cleanup = () => {
    root.unmount();
    document.body.removeChild(container);
  };

  const backgroundColor: Record<Severity, string> = {
    success: "#4caf50 !important",
    warning: "#ff9800 !important",
    error: "#f44336 !important",
    info: "#f44336 !important",
  };

  const getBackgroundColor = (severity?: Severity): string => {
    return backgroundColor[severity ?? "success"];
  };

  root.render(
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={cleanup}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: getBackgroundColor(type),
        },
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CustomAlert onClose={cleanup} severity={type}>
        {message}
      </CustomAlert>
    </Snackbar>
  );
};

const CustomAlert = React.forwardRef<HTMLDivElement, MuiAlertProps>(
  function CustomAlert(props, ref) {
    return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
  }
);

export default showAlert;
