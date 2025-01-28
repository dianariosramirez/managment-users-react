import { PageTitleComponentProps } from "@/lib/types";
import { Divider, Typography } from "@mui/material";
import React from "react";

export const PageTitle = ({ title }: PageTitleComponentProps) => {
  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Divider />
    </>
  );
};
