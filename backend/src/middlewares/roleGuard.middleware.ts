import { NextFunction, Request, Response } from "express";
import { PermissionType, Permissions } from "../enums/role.enum";
import { UnauthorizedException } from "../utils/appError";
import { getRoleByUsesrIdService } from "../services/user.service";

const hasRole =
  (requiredPermissions: PermissionType[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.user._id) {
        throw new UnauthorizedException("Unauthorized. Please log in.");
      }

      const userId = req.user._id;
      const role = await getRoleByUsesrIdService(userId);
      const permissions = role.role.permissions;

      // If the role doesn't exist or lacks required permissions, throw an exception
      const hasPermission = requiredPermissions.every((permission) =>
        permissions.includes(permission)
      );

      if (!hasPermission) {
        throw new UnauthorizedException(
          "You do not have the necessary permissions to perform this action"
        );
      }

      return next();
    } catch (error: any) {
      return next(error);
    }
  };

// const hasRole =
//   (requiredPermissions: PermissionType[]) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.user?._id;
//       console.log("hasRole >>", req.user, requiredPermissions);
//       return next();
//     } catch (error) {
//       return next(error);
//     }
//   };

export default hasRole;
