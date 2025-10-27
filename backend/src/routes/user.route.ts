import { Router } from "express";
import { Permissions } from "../enums/role.enum";
import hasRole from "../middlewares/roleGuard.middleware";
import {
  getCurrentUserController,
  createUserController,
  updateUserController,
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);

userRoutes.post(
  "/create",
  hasRole([Permissions.CREATE_MEMBER]),
  createUserController
);

userRoutes.put(
  "/update",
  hasRole([Permissions.EDIT_MEMBER]),
  updateUserController
);

userRoutes.get("/all", hasRole([Permissions.VIEW_ONLY]), getAllUsersController);

userRoutes
  .route("/:id")
  .get(hasRole([Permissions.VIEW_ONLY]), getUserByIdController)
  .delete(hasRole([Permissions.DELETE_MEMBER]), deleteUserController);

export default userRoutes;
