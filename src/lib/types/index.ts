import { Control, FieldErrors, UseFormTrigger } from "react-hook-form";
import { z } from "zod";
import userSchema from "../forms/userSchema";

/**
 * Common Values
 */
type Values = z.infer<typeof userSchema>;
export type FieldNameValues =
  | "number"
  | "role"
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "street"
  | "neighborhood"
  | "city"
  | "postalCode"
  | "middleName";

/**
 * Base Props
 */
interface BaseInputProps {
  name: FieldNameValues;
  control: Control<Values>;
  placeholder: string;
  errors: boolean;
  helperText?: string;
  trigger: UseFormTrigger<Values>;
  value?: string;
}

/**
 * Component-Specific Props
 */
export interface PageTitleComponentProps {
  title: string;
}

export interface Column {
  id: keyof UserData;
  label: string;
  width: string;
  align: "right" | "center" | "left" | "inherit" | "justify";
}

export interface Filters {
  role?: string;
  status?: string;
}

export interface SortBy {
  column: keyof UserData | null;
  order: "asc" | "desc";
}

export interface FilterVariables extends Filters {
  search?: string;
  email?: string;
  name?: string;
  pageSize: number;
  pageIndex: number;
  sortBy: SortBy;
}

/**
 * Inputs
 */
export interface InputCustomProps extends BaseInputProps {
  nameField: string;
  fieldType: string;
  menuItemList: { value: string; label: string }[];
  required: boolean;
}

export interface TextInputProps extends BaseInputProps {}

export interface SelectInputProps extends BaseInputProps {
  menuItemList: { value: string; label: string }[];
}

/**
 * User Data
 */
export interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  actions: boolean;
}

export interface UserCompleteData {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  actions: boolean;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  photo: string;
}
