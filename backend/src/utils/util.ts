import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { config } from "../config/app.config";

export const hashValue = async (
  value: string,
  saltRounds: number = Number(config.BCRYPT_SALTROUNDS)
) => await bcrypt.hash(value, saltRounds);

export const compareValue = async (value: string, hashedValue: string) =>
  await bcrypt.compare(value, hashedValue);

export const getToken = async ({
  _id,
  email,
}: {
  _id: string;
  email: string;
}) => {
  const expiresIn = Number(
    config.JWT_EXPIRATION_SECONDS
  ) as jwt.SignOptions["expiresIn"];
  const payload = {
    _id,
    email,
  };

  const algorithm = config.JWT_ALGORITHM as jwt.Algorithm;

  return await jwt.sign(payload, config.JWT_SECRET, {
    algorithm,
    expiresIn,
  });
};

export const isValidId = (objectId: unknown): boolean => {
  const objectIdString = String(objectId);

  return mongoose.Types.ObjectId.isValid(objectIdString);
};
