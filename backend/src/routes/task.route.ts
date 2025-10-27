import { Router } from "express";
import { Permissions } from "../enums/role.enum";
import hasRole from "../middlewares/roleGuard.middleware";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post(
  "/create",
  hasRole([Permissions.CREATE_TASK]),
  createTaskController
);

taskRoutes.put(
  "/update",
  hasRole([Permissions.EDIT_TASK]),
  updateTaskController
);

taskRoutes.get("/all", hasRole([Permissions.VIEW_ONLY]), getAllTasksController);

taskRoutes
  .route("/:id")
  .get(hasRole([Permissions.VIEW_ONLY]), getTaskByIdController)
  .delete(hasRole([Permissions.DELETE_TASK]), deleteTaskController);

export default taskRoutes;
