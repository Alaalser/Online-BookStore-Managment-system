import { cartService } from "../services";
import {  Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cartRepository } from "../repository";

const getCart = async (req: any, res: Response) => {
  const { id } = req.user;
  try {
    const cart = await cartService.getCart(parseInt(id as any));
    return res.status(StatusCodes.ACCEPTED).send(cart);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const addToCart = async (req: any, res: Response) => {
  const { id } = req.user;
  const { bookId, quantity } = req.body;
  try {
    const cart = await cartService.addToCart(
      parseInt(id as any),
      bookId,
      quantity
    );
    return res.status(StatusCodes.ACCEPTED).send(cart);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const updateCart = async (req: any, res: Response) => {
  const { id } = req.user;
  const { bookId, quantity } = req.body;

  try {
    const cart = await cartService.updateCart(
      parseInt(id as any),
      bookId,
      quantity
    );
    return res.status(StatusCodes.ACCEPTED).send(cart);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const removeFromCart = async (req: any, res: Response) => {
  const { id } = req.user;

  const { bookId } = req.body;
  try {
    const book = await cartRepository.removeFromCart(
      parseInt(id as any),
      bookId
    );
    return res.status(StatusCodes.ACCEPTED).send(book);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, status: error.statusCode });
  }
};

const clearCart = async (req: any, res: Response) => {
  const { id } = req.user;
  try {
    const cart = await cartRepository.clearCart(parseInt(id as any));

    return res.status(StatusCodes.ACCEPTED).send(cart);
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
  updateCart,
  clearCart,
};
