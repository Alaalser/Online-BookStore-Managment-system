import { Response, Request, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userSchema } from "./auth.validations";
export async function authValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await userSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error: any) {
    let errorMessage = "";
    for (let i = 0; i < error.details.length; i++) {
      const err = error.details[i];
      console.log(err);
      errorMessage +=
        err.path.join("  ") +
        err.message.slice(err.message.lastIndexOf('"') + 1);

      if (i !== error.details.length - 1) {
        errorMessage += ", ";
      }
    }
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: errorMessage, status: StatusCodes.BAD_REQUEST });
  }
}
