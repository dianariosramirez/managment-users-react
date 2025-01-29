"use client";

import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, theme } from "@/theme";
import useAppStore from "@/lib/store/useAppStore";

export default function ThemeProviderApp({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode } = useAppStore();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      {children}
    </ThemeProvider>
  );
}
