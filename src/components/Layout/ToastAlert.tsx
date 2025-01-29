"use client";

import {
  Alert,
  AlertColor,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useAppStore from "@/lib/store/useAppStore";

export const ToastAlert = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Get the snackbar props from the app store and the function to set them

  const { setSnackbarProps, snackbarProps } = useAppStore();

  const handleClose = () => {
    setSnackbarProps({ open: false, message: "", severity: "" });
  };

  if (isMediumScreen) {
    return (
      <Snackbar
        open={snackbarProps.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarProps.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbarProps.message}
        </Alert>
      </Snackbar>
    );
  } else {
    return (
      <Snackbar
        open={snackbarProps.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbarProps.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbarProps.message}
        </Alert>
      </Snackbar>
    );
  }
};
