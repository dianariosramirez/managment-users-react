import {
  InputCustomProps,
  SelectInputProps,
  TextInputProps,
} from "@/lib/types";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

// Custom input component for text input fields in the form using react-hook-form and material-ui TextField

const InputTextCustom = ({
  name,
  control,
  errors,
  helperText,
  placeholder,
  trigger,
}: TextInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{ width: "90%" }}
          value={field.value || ""}
          size="small"
          type="text"
          placeholder={placeholder}
          error={errors}
          helperText={helperText}
          onChange={(e) => {
            field.onChange(e);
            trigger(name);
          }}
          onBlur={(e) => {
            trigger(name);
          }}
        />
      )}
    />
  );
};

const SelectorCustom = ({
  control,
  errors,
  trigger,
  helperText,
  name,
  placeholder,
  menuItemList,
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          key={field.name}
          {...field}
          select
          sx={{ width: "90%" }}
          size="small"
          placeholder={name}
          value={field.value ? field.value : 0}
          onChange={(e) => {
            field.onChange(e);
            trigger(name);
          }}
          onBlur={(e) => {
            trigger(name);
          }}
          error={errors}
          helperText={helperText}
        >
          <MenuItem disabled value={0}>
            <Typography color={"text.disabled"}>{placeholder}</Typography>
          </MenuItem>
          {menuItemList.map((item) => {
            return (
              <MenuItem
                key={item.value}
                value={item.value}
                sx={{ ":hover": { backgroundColor: "primary.light" } }}
              >
                <Typography>{item.label}</Typography>
              </MenuItem>
            );
          })}
        </TextField>
      )}
    />
  );
};

export const InputCustomized = ({
  nameField,
  name,
  control,
  fieldType,
  menuItemList,
  placeholder,
  errors,
  helperText,
  trigger,
  value,
}: InputCustomProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: "16px",
      }}
    >
      <Typography color="primary" textAlign="left" sx={{ width: "90%" }}>
        {nameField}
      </Typography>
      {fieldType === "text" ? (
        <InputTextCustom
          control={control}
          errors={errors}
          trigger={trigger}
          helperText={helperText}
          name={name}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <SelectorCustom
          control={control}
          errors={errors}
          trigger={trigger}
          helperText={helperText}
          name={name}
          placeholder={placeholder}
          menuItemList={menuItemList || []}
        />
      )}
    </Box>
  );
};
