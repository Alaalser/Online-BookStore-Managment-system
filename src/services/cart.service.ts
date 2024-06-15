import { StatusCodes } from "http-status-codes";
import { cartRepository } from "../repository";
import { ApiError } from "../utils/ApiError";

const getCart = async (userId: number) => {
  const cart = await cartRepository.getCart(userId);
  if (!cart) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Cart dose not exist");
  }

  return cart;
};

const addToCart = async (userId: number, bookId: number, quantity: number) => {
  const cart = await cartRepository.addToCart(userId, bookId, quantity);
  return cart;
};

const updateCart = async (
  userId: number,
  bookId: number,
  quantity: number
) => {
  const cart = await cartRepository.updateCart(userId, bookId, quantity);

  if (!cart) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "inputs wrong");
  }
};

const removeFromCart = async (userId: number, bookId: number) => {
  const book = await cartRepository.removeFromCart(userId, bookId);

  if (!book) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Book is not exist in the cart");
  }

  return book;
};

const clearCart = async (userId: number) => {
  const cart = await cartRepository.clearCart(userId);
  return cart;
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCart,
};
