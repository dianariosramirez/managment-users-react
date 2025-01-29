import { createTheme } from "@mui/material/styles";

// Theme for the application
export const theme = createTheme({
  palette: {
    primary: {
      light: "#3498DB",
      main: "#2C3E50",
      dark: "#34495E",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#D6EAF8",
      main: "#3498DB",
      dark: "#2980B9",
      contrastText: "#FFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#2C3E50",
      secondary: "#7F8C8D",
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3498DB",
          color: "#FFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#3498DB",
          color: "#2C3E50",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3498DB",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3498DB",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3498DB",
          },
          color: "#2C3E50",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#3498DB",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          color: "#2C3E50",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#2C3E50",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#2C3E50",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#7F8C8D",
          },
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "96px",
      color: "#2C3E50",
    },
    h2: {
      fontSize: "60px",
      color: "#2C3E50",
    },
    h3: {
      fontSize: "48px",
      color: "#2C3E50",
    },
    h4: {
      fontSize: "34px",
      color: "#2C3E50",
    },
    h5: {
      fontSize: "24px",
      color: "#2C3E50",
    },
    h6: {
      fontSize: "20px",
      color: "#2C3E50",
    },
    body1: {
      fontSize: "16px",
      color: "#2C3E50",
    },
    body2: {
      fontSize: "14px",
      color: "#7F8C8D",
    },
  },
});

// Dark theme for the application

export const darkTheme = createTheme({
  palette: {
    primary: {
      light: "#A2B79C",
      main: "#2C3E50",
      dark: "#34495E",
      contrastText: "#FFF",
    },
    secondary: {
      light: "#A8B9B4",
      main: "#3498DB",
      dark: "#2980B9",
      contrastText: "#FFF",
    },
    background: {
      default: "#1A1A1A",
      paper: "#2A2A2A",
    },
    text: {
      primary: "#FFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    h1: { fontSize: "96px", color: "#FFF" },
    h2: { fontSize: "60px", color: "#FFF" },
    body1: { fontSize: "16px", color: "#FFF" },
    body2: { fontSize: "14px", color: "#FFF" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#3498DB",
          color: "#FFF",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3498DB",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3498DB",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3498DB",
          },
          color: "#FFF",
        },
        input: {
          "&::placeholder": {
            color: "#B0B0B0",
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#B0B0B0",
          "&.Mui-focused": {
            color: "#3498DB",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#FFF",
          "& .MuiSelect-icon": {
            color: "#3498DB",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#FFF",
          backgroundColor: "#2A2A2A",
          "&:hover": {
            backgroundColor: "#3498DB",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFF",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#FFF",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2A2A2A",
          color: "#FFF",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#3498DB",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3498DB",
          color: "#FFF",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#FFF",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#B0B0B0",
          },
        },
      },
    },
  },
});
