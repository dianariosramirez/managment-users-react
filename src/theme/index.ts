

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#86A789",
      main: "#4F6F52",
      dark: "#739072",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#D2E3C8",
      main: "#1A3636",
      dark: "#40534C",
      contrastText: "#FFF",
    },
  },
  typography: {
    h1: {
      fontSize: "96px",
    },
    h2: {
      fontSize: "60px",
    },
    h3: {
      fontSize: "48px",
    },
    h4: {
      fontSize: "34px",
    },
    h5: {
      fontSize: "24px",
    },
    h6: {
      fontSize: "20px",
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
    },
  },
});
