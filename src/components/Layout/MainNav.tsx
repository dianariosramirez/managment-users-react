import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import Image from "next/image";
import React from "react";

export const MainNav = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Image src={"/logo.png"} width={50} height={50} alt="logo" />
        </Box>
        <Avatar alt="User Avatar" sx={{ bgcolor: "secondary.main" }}>
          D
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};
