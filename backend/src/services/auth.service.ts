import mongoose from "mongoose";
import UserModel from "../models/user.model";
import RoleModel from "../models/roles-permission.model";
import { Roles } from "../enums/role.enum";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";

export const registerUserService = async (body: {
  email: string;
  name: string;
  password: string;
}) => {
  const { email, name, password } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const adminRole = await RoleModel.findOne({
      name: Roles.MEMBER,
    }).session(session);

    if (!adminRole) {
      throw new NotFoundException("Role not found");
    }

    const user = new UserModel({
      email,
      name,
      password,
      role: adminRole._id,
    });
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();
    console.log("End Session...");

    return {
      _id: user._id,
      email: user.email,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

export const verifyUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new NotFoundException("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user;
};

export const findUserByIdService = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new NotFoundException("Invalid user");
  }

  return user;
};
