"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";

export default function ThemeProviderApp({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
