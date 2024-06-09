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

const addToCart = async (cartId: number, bookId: number, quantity: number) => {
  const cart = await cartRepository.addToCart(cartId, bookId, quantity);
  return cart;
};

const removeFromCart = async (cartId: number, bookId: number) => {
  const book = await cartRepository.removeFromCart(cartId, bookId);

  if (!book) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Book is not exist in the cart");
  }

  return book;
};

export default {
  getCart,
  addToCart,
  removeFromCart,
};
