import { StatusCodes } from "http-status-codes";
import { authRepository } from "../repository";
import { ApiError } from "../utils/ApiError";

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
};
