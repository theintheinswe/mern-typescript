import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import passport from "passport";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          throw new UnauthorizedException(
            info?.message || "Unauthorized. Please log in."
          );
        }

        req.logIn(user, { session: false }, async (err) => {
          if (err) {
            return next(err);
          }

          return next();
        });
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;
