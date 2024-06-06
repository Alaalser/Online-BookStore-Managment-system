import { IUser } from "../types";
import jwt from "jsonwebtoken";
import config from "../config";

export const generateAccessToken = (user: IUser) => {
  const { id, email } = user;
  const accessToken = jwt.sign(
    { userId: id, email },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );
  return accessToken;
};
