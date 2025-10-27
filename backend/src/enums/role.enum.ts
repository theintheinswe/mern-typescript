export const Roles = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export type RoleType = keyof typeof Roles;

export const Permissions = {
  CREATE_MEMBER: "CREATE_MEMBER",
  EDIT_MEMBER: "EDIT_MEMBER",
  DELETE_MEMBER: "DELETE_MEMBER",

  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",

  VIEW_ONLY: "VIEW_ONLY",
} as const;

export type PermissionType = keyof typeof Permissions;
