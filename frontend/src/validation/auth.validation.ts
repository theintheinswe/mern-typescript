import { z } from "zod";
import { Roles } from "@/constant";

const User = z
  .object({
    name: z.string().trim().min(1).max(255),
    email: z.string().trim().email("Invalid email address").min(1).max(255),
    role: z.nativeEnum(Roles, {
      required_error: "Role is required",
    }),
  })
  .strict();

export const userIdSchema = z.string().trim().min(1).max(255);
export type TUserIdSchema = { _id: string };

export const createUserSchema = User.extend({
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});

export type TCreateUserSchema = z.infer<typeof createUserSchema>;

export const editUserSchema = User.extend({
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .optional()
    .or(z.literal("")),
});
export type TEditUserSchema = z.infer<typeof editUserSchema>;

export const signUpSchema = User.pick({
  name: true,
  email: true,
}).extend({
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = User.pick({
  email: true,
}).extend({
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim(),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
