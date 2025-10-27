import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  checkUsersExist,
  createTaskService,
  updateTaskService,
  getAllTasksService,
  getTaskByIdService,
  deleteTaskService,
} from "../services/task.service";
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from "../validation/task.validation";
import { Roles } from "../enums/role.enum";

export const createTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createTaskSchema.parse(req.body);

    const userId = req.user?._id;

    if (body.assignedTo && body.assignedTo.length > 0)
      await checkUsersExist(body.assignedTo);

    const task = await createTaskService(userId, { ...body });

    return res.status(HTTPSTATUS.OK).json({
      message: "Task created successfully",
      task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedTo: task.assignedTo,
        dueDat: task.dueDate,
      },
    });
  }
);

export const updateTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = updateTaskSchema.parse(req.body);

    if (body.assignedTo && body.assignedTo.length > 0)
      await checkUsersExist(body.assignedTo);

    const task = await updateTaskService({ ...body });

    return res.status(HTTPSTATUS.OK).json({
      message: "Task updated successfully",
      task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedTo: task.assignedTo,
        dueDat: task.dueDate,
      },
    });
  }
);

export const getAllTasksController = asyncHandler(
  async (req: Request, res: Response) => {
    const filters = {
      status: req.query.status
        ? (req.query.status as string)?.split(",")
        : undefined,
      priority: req.query.priority
        ? (req.query.priority as string)?.split(",")
        : undefined,
      assignedTo: req.query.assignedTo
        ? (req.query.assignedTo as string)?.split(",")
        : undefined,
      keyword: req.query.keyword as string | undefined,
      dueDate: req.query.dueDate as string | undefined,
    };

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 10,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const tasks = await getAllTasksService(filters, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "All tasks fetched successfully",
      ...tasks,
    });
  }
);

export const getTaskByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const taskId = taskIdSchema.parse(req.params.id);

    const task = await getTaskByIdService(taskId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Task fetched successfully",
      task,
    });
  }
);

export const deleteTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const taskId = taskIdSchema.parse(req.params.id);

    const task = await getTaskByIdService(taskId);

    await deleteTaskService(task.id);

    return res.status(HTTPSTATUS.OK).json({
      message: "Task deleted successfully",
    });
  }
);
