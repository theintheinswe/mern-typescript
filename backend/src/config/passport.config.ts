import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

import {
  verifyUserService,
  findUserByIdService,
} from "../services/auth.service";

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password });
        return done(null, user);
      } catch (error: any) {
        return done(error, false, { message: error?.message });
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
      algorithms: [config.JWT_ALGORITHM as jwt.Algorithm],
    },
    async (jwtPayload, done) => {
      try {
        const user = await findUserByIdService(jwtPayload._id);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        return done(
          null,
          { _id: user._id, email: user.email },
          { message: "User found" }
        );
      } catch (error: any) {
        return done(error, false, { message: error?.message });
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));
