import {
  PermissionType,
  TaskPriorityEnumType,
  TaskStatusEnumType,
} from "@/constant";

export type loginType = { email: string; password: string };
export type LoginResponseType = {
  message: string;
  token: string;
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

// USER TYPE
export type UserType = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  isActive: true;
  lastLogin: null;
  createdAt: Date;
  updatedAt: Date;
  role: {
    _id: string;
    name: string;
    permissions?: PermissionType[];
  };
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};

export type AllUsersResponseType = {
  message: string;
  users: UserType[];
};

export type CreateUserType = Pick<
  UserType,
  "_id" | "name" | "email" | "password" | "role"
>;

export type EditWorkspaceType = {
  data: {
    name: string;
    description: string;
  };
};

export type CreateWorkspaceResponseType = {
  message: string;
  workspace: WorkspaceType;
};

export type AllWorkspaceResponseType = {
  message: string;
  workspaces: WorkspaceType[];
};

// Role Type
export type RoleType = {
  _id: string;
  name: string;
};

//********** */ TASK TYPES ************************
//************************************************* */

export type CreateTaskPayloadType = {
  data: {
    title: string;
    description: string;
    priority: TaskPriorityEnumType;
    status: TaskStatusEnumType;
    assignedTo: string[] | null;
    dueDate: string;
  };
};

export type TaskType = {
  _id: string;
  taskCode: string;
  title: string;
  description?: string;
  priority: TaskPriorityEnumType;
  status: TaskStatusEnumType;
  assignedTo: {
    _id: string;
    name: string;
    email: string;
  } | null;
  createdBy?: string;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AllTaskPayloadType = {
  keyword?: string | null;
  priority?: TaskPriorityEnumType | null;
  status?: TaskStatusEnumType | null;
  assignedTo?: string | null;
  dueDate?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
};

export type PaginationType = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  skip: number;
  limit: number;
};

export type AllTaskResponseType = {
  message: string;
  tasks: TaskType[];
  pagination: PaginationType;
};
