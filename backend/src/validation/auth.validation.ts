import { z } from "zod";
import { Roles } from "../enums/role.enum";
import { isValidId } from "../utils/util";

const User = z
  .object({
    name: z.string().trim().min(1).max(255),
    email: z.string().trim().email("Invalid email address").min(1).max(255),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .min(8, { message: "Password must contain at least 8 character(s)" }),
    role: z.nativeEnum(Roles, {
      required_error: "Role is required",
    }),
  })
  .strict();

export const userIdSchema = z.custom<string>(
  (val) => isValidId(val),
  "Not a valid Id"
);

export const createUserSchema = User;

export const updateUserSchema = User.omit({ password: true }).extend({
  _id: userIdSchema,
});

export const registerSchema = User.pick({
  name: true,
  email: true,
  password: true,
});

export const loginSchema = User.pick({
  email: true,
  password: true,
});
