import { z } from "zod";

const userSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required and cannot be empty." }),
  lastName: z
    .string()
    .min(1, { message: "Last Name is required and cannot be empty." }),
  middleName: z.string().optional(),
  email: z.string().email({ message: "Please provide a valid email address." }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Phone Number must be exactly 10 digits (e.g., 1234567890).",
  }),
  role: z.string().min(1, { message: "Role is required and cannot be empty." }),
  street: z
    .string()
    .min(1, { message: "Street is required and cannot be empty." }),
  number: z.string().min(1, {
    message: "House/Building Number is required and cannot be empty.",
  }),
  neighborhood: z
    .string()
    .min(1, { message: "Neighborhood is required and cannot be empty." }),
  city: z.string().min(1, { message: "City is required and cannot be empty." }),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Postal Code must be a valid format (e.g., 12345 or 12345-6789).",
  }),
});

export default userSchema;
