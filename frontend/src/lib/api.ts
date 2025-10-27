import API from "./axios-client";
import { TSignUpSchema } from "@/validation/auth.validation";
import {
  LoginResponseType,
  loginType,
  AllTaskPayloadType,
  AllTaskResponseType,
  CreateTaskPayloadType,
  CurrentUserResponseType,
  AllUsersResponseType,
} from "@/types/api.type";
import { PermissionType } from "@/constant";
import { TCreateTaskSchema } from "@/validation/task.validation";
import {
  TCreateUserSchema,
  TEditUserSchema,
  TUserIdSchema,
} from "@/validation/auth.validation";

export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerMutationFn = async (data: TSignUpSchema) =>
  await API.post("/auth/register", data);

export const logoutMutationFn = async () => await API.post("/auth/logout");

export const getRolePermissionsQueryFn = async (): Promise<
  PermissionType[]
> => {
  const response = await API.get(`/user/role-permissions`);
  return response.data;
};

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/user/current`);
    return response.data;
  };

//********* User ****************
//************* */

export const createUserMutationFn = async (data: TCreateUserSchema) => {
  const response = await API.post(`/user/create`, data);
  return response.data;
};

export const editUserMutationFn = async (
  data: TEditUserSchema & TUserIdSchema
) => {
  const response = await API.put(`/user/update`, data);
  return response.data;
};

export const getAllUsersQueryFn = async (): Promise<AllUsersResponseType> => {
  const response = await API.get(`/user/all`);
  return response.data;
};

export const getUserByIdQueryFn = async (
  userId: string
): Promise<UserByIdResponseType> => {
  const response = await API.get(`/user/${userId}`);
  return response.data;
};

export const deleteUserMutationFn = async (
  userId: string
): Promise<{
  message: string;
  currentWorkspace: string;
}> => {
  const response = await API.delete(`/user/${userId}`);
  return response.data;
};

//*******TASKS ********************************
//************************* */

export const createTaskMutationFn = async (
  data: Omit<TCreateTaskSchema, "assignedTo" | "dueDate"> & {
    assignedTo?: string[];
    dueDate?: string;
  }
) => {
  const response = await API.post(`/task/create`, data);
  return response.data;
};

export const getAllTasksQueryFn = async ({
  keyword,
  assignedTo,
  priority,
  status,
  dueDate,
  pageNumber,
  pageSize,
}: AllTaskPayloadType): Promise<AllTaskResponseType> => {
  const baseUrl = `/task/all`;

  const queryParams = new URLSearchParams();
  if (keyword) queryParams.append("keyword", keyword);
  if (assignedTo) queryParams.append("assignedTo", assignedTo);
  if (priority) queryParams.append("priority", priority);
  if (status) queryParams.append("status", status);
  if (dueDate) queryParams.append("dueDate", dueDate);
  if (pageNumber) queryParams.append("pageNumber", pageNumber?.toString());
  if (pageSize) queryParams.append("pageSize", pageSize?.toString());

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  const response = await API.get(url);
  return response.data;
};

export const deleteTaskMutationFn = async ({
  taskId,
}: {
  taskId: string;
}): Promise<{
  message: string;
}> => {
  const response = await API.delete(`task/${taskId}`);
  return response.data;
};
