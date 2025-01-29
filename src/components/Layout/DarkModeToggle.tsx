"use client";

import React from "react";
import { Box, IconButton } from "@mui/material";

import useAppStore from "@/lib/store/useAppStore";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useAppStore();

  return (
    <Box>
      <IconButton
        onClick={toggleDarkMode}
        sx={{
          border: "1px solid",
          borderColor: "primary.light",
          color: "primary.light",
        }}
      >
        {darkMode ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Box>
  );
}
