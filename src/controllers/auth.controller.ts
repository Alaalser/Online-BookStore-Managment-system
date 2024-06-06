import { authService } from "../services";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.signin(email, password);

    res.cookie("jwt", token, {
      httpOnly: true,
    });
    return res.status(StatusCodes.ACCEPTED).send({ token });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    await authService.signup(name, email, password);
    return res.status(StatusCodes.CREATED).send("signup succfully");
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    return res.send("logout succfully");
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error?.message, status: error.statusCode });
  }
};
export default {
  signIn,
  signup,
  logout,
};
