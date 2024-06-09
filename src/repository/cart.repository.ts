import Book from "../models/book.model";
import CartBook from "../models/cart-bookItem.model";
import Cart from "../models/cart.model";
import { enums } from "../types";

const getCartBook = async (): Promise<CartBook[]> => {
  return await CartBook.findAll();
};
const getCatSingleBook = async (bookId: number) => {
  return await CartBook.findOne({ where: { book_id: bookId } });
};

const getCart = async (userId: number): Promise<Cart | null> => {
  const [cart] = await Cart.findOrCreate<Cart>({
    where: { status: enums.CART_STATUS.IN_PROGRESS, user_id: userId },
  });
  return cart;
};

const getActiveCartById = async (cartId: string) => {
  return await Cart.findOne({
    where: { id: cartId, status: enums.CART_STATUS.IN_PROGRESS },
  });
};

const addToCart = async (
  cartId: number,
  bookId: number,
  quantity: number = 1
): Promise<Cart | null> => {
  const [cartBook, created] = await CartBook.findOrCreate({
    where: { cart_id: cartId, book_id: bookId },
    defaults: { quantity },
  });

  if (!created) {
    cartBook.quantity += quantity;
    await cartBook.save();
  }

  const cart = await Cart.findByPk(cartId, {
    include: [
      {
        model: Book,
        through: {
          attributes: ["quantity"],
        },
      },
    ],
  });

  return cart;
};

const removeFromCart = async (
  cartId: number,
  bookId: number
): Promise<Book | any> => {
  const cartBook = await CartBook.findOne({
    where: { cart_id: cartId, book_id: bookId },
  });

  await cartBook?.destroy();

  return cartBook;
};

const deleteCart = async (cartId: number): Promise<Cart | null> => {
  const cart = await Cart.findByPk(cartId);

  // Remove all books from the cart first
  await CartBook.destroy({ where: { cart_id: cartId } });

  // Delete the cart
  await cart?.destroy();

  return cart;
};

export default {
  getCatSingleBook,
  getCartBook,
  getActiveCartById,
  getCart,
  addToCart,
  removeFromCart,
  deleteCart,
};
