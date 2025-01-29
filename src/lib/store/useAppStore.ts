import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: string;
}

interface AppState {
  darkMode: boolean;
  snackbarProps: SnackbarProps;
  toggleDarkMode: () => void;
  setSnackbarProps: (props: SnackbarProps) => void;
}

// App store to manage global state for the app
const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      snackbarProps: {
        open: false,
        message: "",
        severity: "info",
      },

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSnackbarProps: (props: SnackbarProps) =>
        set({ snackbarProps: { ...props } }),
    }),
    { name: "app-store" }
  )
);

export default useAppStore;
