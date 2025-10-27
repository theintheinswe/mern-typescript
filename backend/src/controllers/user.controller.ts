import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  getCurrentUserService,
  getRole,
  checkEmailExist,
  createUserService,
  updateUserService,
  getAllUsersService,
  getUserByIdService,
  deleteUserService,
} from "../services/user.service";
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../validation/auth.validation";
import { Roles } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { user } = await getCurrentUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User fetch successfully",
      user,
    });
  }
);

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createUserSchema.parse(req.body);

    await checkEmailExist(body.email);

    const role = await getRole(Roles.MEMBER);

    const user = await createUserService({ ...body, role: role.id });

    return res.status(HTTPSTATUS.OK).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  }
);

export const updateUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = updateUserSchema.parse(req.body);

    await getUserByIdService(body._id);

    await checkEmailExist(body.email, body._id);

    const role = await getRole(body.role);

    const updatedUser = await updateUserService({ ...body, role: role.id });

    return res.status(HTTPSTATUS.OK).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      },
    });
  }
);

export const getAllUsersController = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await getAllUsersService();

    return res.status(HTTPSTATUS.OK).json({
      message: "All users fetched successfully",
      users,
    });
  }
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = userIdSchema.parse(req.params.id);

    const user = await getUserByIdService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User fetched successfully",
      user,
    });
  }
);

export const deleteUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = userIdSchema.parse(req.params.id);

    const user = await getUserByIdService(userId);

    await deleteUserService(user.id);

    return res.status(HTTPSTATUS.OK).json({
      message: "User deleted successfully",
    });
  }
);
