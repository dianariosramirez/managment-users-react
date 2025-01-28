import { userAdressForm, userForm } from "@/lib/forms/formatForm";
import { Add, PersonAddAlt } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { z } from "zod";
import userSchema from "@/lib/forms/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCustomized } from "./InputCustomized";

type Values = z.infer<typeof userSchema>;

const defaultValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phoneNumber: "",
  role: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  postalCode: "",
} satisfies Values;

export const NewUserAction = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(userSchema) });

  const handleAddUser = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: Values) => {
    console.log(values);
  };

  console.log("error-->", errors);
  return (
    <>
      <Button
        variant="contained"
        onClick={handleAddUser}
        startIcon={<PersonAddAlt />}
      >
        Add User
      </Button>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
              p: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              New User
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={photo || undefined}
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px solid",
                  borderColor: "primary.main",
                  borderRadius: 0,
                }}
              />
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <Add />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handlePhotoChange}
                />
              </IconButton>
            </Box>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container>
              <Grid2
                size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                sx={{ mb: 2, px: 2 }}
              >
                <Typography variant="h6" color="primary">
                  Personal data:
                </Typography>
              </Grid2>
              {userForm.map((input) => {
                return (
                  <Grid2
                    size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                    key={input.nameField}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <InputCustomized
                      control={control}
                      errors={Boolean(errors[input.name])}
                      nameField={input.nameField}
                      name={input.name}
                      fieldType={input.fieldType}
                      required={input.required}
                      placeholder={input.placeholder}
                      helperText={errors[input.name]?.message}
                      trigger={trigger}
                      menuItemList={input.menuList ? input.menuList : []}
                    />
                  </Grid2>
                );
              })}
              <Grid2
                size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                sx={{ mb: 2, px: 2 }}
              >
                <Typography variant="h6" color="primary">
                  Adress:
                </Typography>
              </Grid2>
              {userAdressForm.map((input) => {
                return (
                  <Grid2
                    size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                    key={input.nameField}
                    sx={{ mb: 2, px: 2 }}
                  >
                    <InputCustomized
                      control={control}
                      errors={Boolean(errors[input.name])}
                      nameField={input.nameField}
                      name={input.name}
                      fieldType={input.fieldType}
                      required={input.required}
                      placeholder={input.placeholder}
                      helperText={errors[input.name]?.message}
                      trigger={trigger}
                      menuItemList={input.menuList ? input.menuList : []}
                    />
                  </Grid2>
                );
              })}
              <Button type="submit">Add</Button>
            </Grid2>
          </form>
        </Box>
      </Modal>
    </>
  );
};
