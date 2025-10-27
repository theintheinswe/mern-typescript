import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";

import Tasks from "@/page/Tasks";
import Users from "@/page/Users";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.USERS, element: <Users /> },
  { path: PROTECTED_ROUTES.TASKS, element: <Tasks /> },
];
