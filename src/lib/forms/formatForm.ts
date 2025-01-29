import { FieldNameValues } from "../types";

interface InputCustomizedProps {
  nameField: string;
  name: FieldNameValues;
  fieldType: "text" | "select";
  required: boolean;
  placeholder: string;
  menuList?: { value: string; label: string }[];
}

// User form fields to be used in the form

export const userForm: InputCustomizedProps[] = [
  {
    nameField: "First Name: *",
    name: "firstName",
    fieldType: "text",
    required: true,
    placeholder: "Enter your first name",
  },
  {
    nameField: "Last Name: *",
    name: "lastName",
    fieldType: "text",
    required: true,
    placeholder: "Enter your last name",
  },
  {
    nameField: "Middle Name: ",
    name: "middleName",
    fieldType: "text",
    required: false,
    placeholder: "Enter your middle name (optional)",
  },
  {
    nameField: "Email: *",
    name: "email",
    fieldType: "text",
    required: true,
    placeholder: "Enter your email address",
  },
  {
    nameField: "Phone Number: *",
    name: "phoneNumber",
    fieldType: "text",
    required: true,
    placeholder: "Enter your phone number (e.g., 1234567890)",
  },
  {
    nameField: "Role: *",
    name: "role",
    fieldType: "select",
    required: true,
    placeholder: "Enter your role",
    menuList: [
      { value: "Admin", label: "Admin" },
      { value: "User", label: "User" },
      { value: "Guest", label: "Guest" },
    ],
  },
];

export const userAdressForm: InputCustomizedProps[] = [
  {
    nameField: "Street: *",
    name: "street",
    fieldType: "text",
    required: true,
    placeholder: "Enter your street name",
  },
  {
    nameField: "Number: *",
    name: "number",
    fieldType: "text",
    required: true,
    placeholder: "Enter your house/building number",
  },
  {
    nameField: "Neighborhood: *",
    name: "neighborhood",
    fieldType: "text",
    required: true,
    placeholder: "Enter your neighborhood",
  },
  {
    nameField: "City: *",
    name: "city",
    fieldType: "text",
    required: true,
    placeholder: "Enter your city",
  },
  {
    nameField: "Postal Code: *",
    name: "postalCode",
    fieldType: "text",
    required: true,
    placeholder: "Enter your postal code (e.g., 12345)",
  },
];
