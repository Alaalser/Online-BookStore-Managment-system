import { Response } from "express";
import { addressService } from "../services";
import { StatusCodes } from "http-status-codes";

const addAddress = async (req: any, res: Response) => {
  const user = req.user;

  const { firstName, lastName, countryCode, mobile, location } = req.body;
  try {
    const address = await addressService.addAddress(
      firstName,
      lastName,
      countryCode,
      mobile,
      location,
      user.id
    );
    return res.status(StatusCodes.CREATED).send(address);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const getAddress = async (req: any, res: Response) => {
  const user = req.user;
  try {
    return res
      .status(StatusCodes.ACCEPTED)
      .send(await addressService.getAddress(Number(user.id)));
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

export default { addAddress, getAddress };
