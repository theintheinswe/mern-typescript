import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task.enum";
import UserModel, { UserDocument } from "../models/user.model";
import TaskModel from "../models/task.model";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const checkUsersExist = async (assignedTo: string[]) => {
  // Check if the assignedTo users exist
  const users = await UserModel.find({ _id: { $in: assignedTo } });
  const userIds = users.map((user) => user.id);
  const notFoundIds = assignedTo.filter(
    (id) => !userIds.includes(id.toString())
  );
  if (notFoundIds.length > 0) {
    throw new NotFoundException(
      `Assigned users do not exist: ${notFoundIds.join(", ")}`
    );
  }
  return users;
};

export const createTaskService = async (
  userId: string,
  body: {
    title: string;
    description?: string;
    priority: string;
    status: string;
    assignedTo?: string[] | null;
    dueDate?: string;
  }
) => {
  const { title, description, priority, status, assignedTo, dueDate } = body;

  const task = new TaskModel({
    title,
    description,
    priority: priority || TaskPriorityEnum.MEDIUM,
    status: status || TaskStatusEnum.TODO,
    assignedTo,
    createdBy: userId,
    dueDate,
  });

  await task.save();

  return task;
};

export const updateTaskService = async (body: {
  _id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  assignedTo?: string[] | null;
  dueDate?: string;
}) => {
  const task = await TaskModel.findById(body._id);

  if (!task) {
    throw new NotFoundException("Task not found");
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    body._id,
    {
      ...body,
    },
    { new: true }
  );

  if (!updatedTask) {
    throw new BadRequestException("Failed to update task");
  }

  return updatedTask;
};

export const getAllTasksService = async (
  filters: {
    projectId?: string;
    status?: string[];
    priority?: string[];
    assignedTo?: string[];
    keyword?: string;
    dueDate?: string;
  },
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const query: Record<string, any> = {};

  if (filters.status && filters.status?.length > 0) {
    query.status = { $in: filters.status };
  }

  if (filters.priority && filters.priority?.length > 0) {
    query.priority = { $in: filters.priority };
  }

  if (filters.assignedTo && filters.assignedTo?.length > 0) {
    query.assignedTo = { $in: filters.assignedTo };
  }

  if (filters.keyword && filters.keyword !== undefined) {
    query.title = { $regex: filters.keyword, $options: "i" };
  }

  if (filters.dueDate) {
    query.dueDate = {
      $eq: new Date(filters.dueDate),
    };
  }

  //Pagination Setup
  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [tasks, totalCount] = await Promise.all([
    TaskModel.find(query, "-__v")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "_id name email"),
    TaskModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    tasks,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};

export const getTaskByIdService = async (taskId: string) => {
  const task = await TaskModel.findOne({
    _id: taskId,
  }).populate("assignedTo", "_id name email ");

  if (!task) {
    throw new NotFoundException("Task not found.");
  }

  return task;
};

export const deleteTaskService = async (taskId: string) => {
  const task = await TaskModel.findOneAndDelete({
    _id: taskId,
  });

  if (!task) {
    throw new NotFoundException("Task not found");
  }

  return;
};
