import { userAdressForm, userForm } from "@/lib/forms/formatForm";
import { Add } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import userSchema from "@/lib/forms/userSchema";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCustomized } from "./InputCustomized";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { UserService } from "@/lib/services/UserService.service";
import { UserCompleteData } from "@/lib/types";
import useAppStore from "@/lib/store/useAppStore";

interface ModalUserFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserCompleteData | null;
  type: "add" | "edit";
  refreshTable?: () => void;
}

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

export const ModalUserForm = ({
  isModalOpen,
  setIsModalOpen,
  userData,
  type,
  refreshTable,
}: ModalUserFormProps) => {
  const [photo, setPhoto] = useState<string | null>(userData?.photo || null);
  const [addressCoords, setAddressCoords] = useState({
    lat: 17.073,
    lng: -96.726,
  });

  const { setSnackbarProps } = useAppStore();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if (userData) {
      setPhoto(userData.photo || null);
      setValue("firstName", userData.firstName);
      setValue("middleName", userData.middleName);
      setValue("lastName", userData.lastName);
      setValue("email", userData.email);
      setValue("phoneNumber", userData.phoneNumber);
      setValue("role", userData.role);
      setValue("number", userData.number);
      setValue("street", userData.street);
      setValue("neighborhood", userData.neighborhood);
      setValue("city", userData.city);
      setValue("postalCode", userData.postalCode);
    }
  }, [userData]);

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(userSchema),
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const userFirstName = getValues("firstName");
        const userLastName = getValues("lastName");

        const imageUrl = await UserService.UploadUserPhoto(
          file,
          userFirstName,
          userLastName
        );
        setPhoto(imageUrl);
      } catch (error) {
        console.error("Error to upload photo:", error);
      }
    }
  };

  const onSubmit = async (values: Values) => {
    try {
      const updatedValues = {
        id: userData?.id || crypto.randomUUID(),
        firstName: values.firstName,
        middleName: values.middleName || "",
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: values.role,
        status: userData?.status || "Active",
        number: values.number,
        street: values.street,
        neighborhood: values.neighborhood,
        city: values.city,
        postalCode: values.postalCode,
        photo: photo || "",
        actions: true,
      };

      if (type === "edit" && userData) {
        await UserService.UpdateUser(updatedValues);
        setSnackbarProps({
          open: true,
          message: "User updated successfully",
          severity: "success",
        });
        refreshTable && refreshTable();
      } else {
        await UserService.AddNewUser(updatedValues);
        setSnackbarProps({
          open: true,
          message: "User added successfully",
          severity: "success",
        });
        refreshTable && refreshTable();
      }
      handleCloseModal();
    } catch (error) {
      setSnackbarProps({
        open: true,
        message: "Error adding or updating user",
        severity: "error",
      });
    }
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat() || 0;
    const lng = event.latLng?.lng() || 0;
    setAddressCoords({ lat, lng });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const address = results[0].address_components;

        address.forEach((component) => {
          if (component.types.includes("street_number")) {
            setValue("number", component.long_name);
            trigger("number");
          }
          if (component.types.includes("route")) {
            setValue("street", component.long_name);
            trigger("street");
          }
          if (component.types.includes("locality")) {
            setValue("neighborhood", component.long_name);
            trigger("neighborhood");
          }
          if (component.types.includes("administrative_area_level_1")) {
            setValue("city", component.long_name);
            trigger("city");
          }
          if (component.types.includes("postal_code")) {
            setValue("postalCode", component.long_name);
            trigger("postalCode");
          }
        });
      }
    });
  };

  return (
    <Modal open={isModalOpen}>
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
            {type === "add" ? "New user" : "Update user"}
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
                marginTop: 2,
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
                Address:
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
              sx={{ mb: 2, px: 2 }}
            >
              <Box sx={{ width: "100%", height: "400px" }}>
                {!isLoaded ? (
                  <CircularProgress
                    sx={{ position: "absolute", top: "50%", left: "50%" }}
                  />
                ) : (
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    center={addressCoords}
                    zoom={14}
                  >
                    <Marker
                      position={addressCoords}
                      draggable
                      onDragEnd={handleMarkerDragEnd}
                    />
                  </GoogleMap>
                )}
              </Box>
            </Grid2>

            <Grid2
              size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
              sx={{ mb: 2, px: 2 }}
            >
              {userAdressForm.map((input) => {
                return (
                  <InputCustomized
                    key={input.nameField}
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
                );
              })}
            </Grid2>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
                alignItems: "center",
                mb: 2,
                mr: 5,
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {type === "add" ? "Add user" : "Update user"}
              </Button>
            </Box>
          </Grid2>
        </form>
      </Box>
    </Modal>
  );
};
