import { Response } from "express";
import User from "../models/user.model";
import { orderService } from "../services";
import { addressRepository } from "../repository";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { enums } from "../types";

const CreateOrder = async (req: any, res: Response) => {
  try {
    const { transactionId, cartId, addressId } = req.body;
    const user = req.user as User;

    const hasAddress = await addressRepository.getAddressById(
      addressId,
      parseInt(user.id as any)
    );
    if (!hasAddress) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "There is no address with this ID"
      );
    }

    const order = await orderService.createOrder(
      user.email,
      enums.ORDER_STATUS.ACTIVE,
      parseInt(transactionId),
      parseInt(user.id as any),
      parseInt(cartId),
      parseInt(addressId)
    );

    return res.status(StatusCodes.ACCEPTED).json({
      data: {
        message: "Order created successfully",
        order: order,
      },
    });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const getAllOrders = async (req: any, res: Response) => {
  try {
    const user = req.user as User;
    const orders = await orderService.getOrdersByUserId(user.id);
    res.status(StatusCodes.ACCEPTED).json({
      data: {
        orders: orders,
      },
    });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const getOrderById = async (req: any, res: Response) => {
  try {
    const user = req.user as User;
    const { id } = req.body;
    const order = await orderService.getOrderById(
      parseInt(id),
      parseInt(user.id as any)
    );

    if (!order) {
      return res.status(422).json({
        error: true,
        status: 422,
        data: {
          message: "There is no order with this ID",
        },
      });
    }

    res.status(200).json({
      error: false,
      status: 200,
      data: {
        order: order,
      },
    });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

export default {
  getAllOrders,
  getOrderById,
  CreateOrder,
};
