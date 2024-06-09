import { cartService } from "../services";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cartRepository } from "../repository";

const getCart = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const cart = await cartService.getCart(parseInt(userId));
    return res.status(StatusCodes.ACCEPTED).send(cart);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const addToCart = async (req: Request, res: Response) => {
  const { cartId, bookId, quantity } = req.body;
  try {
    const cart = await cartService.addToCart(cartId, bookId, quantity);
    return res.status(StatusCodes.ACCEPTED).send(cart);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const removeFromCart = async (req: Request, res: Response) => {
  const { cartId, bookId } = req.body;
  try {
    const book = await cartRepository.removeFromCart(cartId, bookId);
    return res.status(StatusCodes.ACCEPTED).send(book);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

export default {
  getCart,
  addToCart,
  removeFromCart,
};
