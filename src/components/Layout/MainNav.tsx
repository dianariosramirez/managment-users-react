import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";

export const MainNav = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Image src={"/logo.png"} width={50} height={50} alt="logo" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <DarkModeToggle />
          <Avatar
            alt="User Avatar"
            sx={{ bgcolor: "primary.ligth", color: "white" }}
          >
            D
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
