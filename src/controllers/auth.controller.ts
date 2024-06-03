import { authService } from "../services";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const { accessToken } = await authService.signup(name, email, password);
    return res.status(StatusCodes.CREATED).send({
      token: accessToken,
    });
  } catch (error: any) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: error.message, status: error.statusCode });
  }
};

export default {
  signup,
};
