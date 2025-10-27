import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import RoleModel, { RoleDocument } from "../models/roles-permission.model";

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    throw new BadRequestException("User not found");
  }

  return {
    user,
  };
};

export const getRole = async (name: string) => {
  const role = await RoleModel.findOne({ name });

  if (!role) {
    throw new NotFoundException("Role not found");
  }

  return role;
};

export const checkEmailExist = async (email: string, _id?: string) => {
  let options: { email: string; _id?: { $ne: string } } = { email };
  if (_id) options._id = { $ne: _id };
  const user = await UserModel.findOne(options);
  if (user) {
    throw new BadRequestException("Email already exists");
  }

  return;
};

export const getRoleByUsesrIdService = async (_id: string) => {
  const role = await UserModel.findById(_id, "_id").populate<{
    role: RoleDocument;
  }>("role");

  if (!role) {
    throw new NotFoundException("Role not found");
  }

  return role;
};

export const createUserService = async (body: {
  email: string;
  name: string;
  password: string;
  role: string;
}) => {
  const { email, name, password, role } = body;

  const user = new UserModel({
    email,
    name,
    password,
    role,
  });

  await user.save();

  return user;
};

export const updateUserService = async (body: {
  _id: string;
  email: string;
  name: string;
  role: string;
}) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    body._id,
    {
      ...body,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new BadRequestException("Failed to update user");
  }

  return updatedUser;
};

export const getAllUsersService = async () => {
  const roles = await UserModel.find({}, "-password -__v").populate<{
    role: RoleDocument;
  }>("role", "name");
  return roles;
};

export const getUserByIdService = async (_id: string) => {
  const user = await UserModel.findById(_id, "-password -__v").populate<{
    role: RoleDocument;
  }>("role", "name");

  if (!user) {
    throw new NotFoundException("User not found");
  }

  return user;
};

export const deleteUserService = async (userId: string) => {
  const user = await UserModel.findOneAndDelete({
    _id: userId,
  });

  if (!user) {
    throw new NotFoundException("User not found ");
  }

  return;
};
