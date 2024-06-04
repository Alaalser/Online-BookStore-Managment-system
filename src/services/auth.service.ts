import { StatusCodes } from "http-status-codes";
import { authRepository } from "../repository";
import { ApiError } from "../utils/ApiError";
import { generateAccessToken } from "../utils/genrateToken";
import { compareUserPassword } from "../models/user.model";

const signin = async (email: string, password: string): Promise<any> => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Wrong email");
  }

  const isPasswordValid = await compareUserPassword(user, password);

  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Wrong password");
  }

  const token = generateAccessToken(user);

  return token;
};

const signup = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "User with this email already exists"
    );
  }

  const newUser = await authRepository.createUser(name, email, password);

  newUser.password = "";

  if (!newUser) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create user"
    );
  }
};

export default {
  signup,
  signin,
};
