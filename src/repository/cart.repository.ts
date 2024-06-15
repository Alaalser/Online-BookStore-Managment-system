import Book from "../models/book.model";
import CartItem from "../models/cart-bookItem.model";
import Cart from "../models/cart.model";
import { enums } from "../types";

const getCartItem = async (): Promise<CartItem[]> => {
  return await CartItem.findAll();
};
const getCatSingleBook = async (bookId: number) => {
  return await CartItem.findOne({ where: { book_id: bookId } });
};

const getCart = async (userId: number): Promise<Cart | null> => {
  const [cart] = await Cart.findOrCreate<Cart>({
    where: {
      user_id: userId,
      include: [
        {
          model: CartItem,
          as: "cart_book_item",
          include: [
            {
              model: Book,
              as: "book_id",
            },
          ],
        },
      ],
    },
  });
  return cart;
};

const getActiveCartById = async (cartId: string) => {
  return await Cart.findOne({
    where: { id: cartId, status: enums.CART_STATUS.IN_PROGRESS },
  });
};

const addToCart = async (
  userId: number,
  bookId: number,
  quantity: number = 1
): Promise<Cart | null> => {
  let cart = await Cart.findByPk(userId, {
    include: [
      {
        model: Book,
        through: {
          attributes: ["quantity"],
        },
      },
    ],
  });

  if (!cart) {
    cart = await Cart.create({ userId });
  }
  const [cartItem, created] = await CartItem.findOrCreate({
    where: { cart_id: cart.dataValues.id, book_id: bookId },
    defaults: { quantity },
  });

  if (!created) {
    cartItem.quantity += quantity;
    await cartItem.save();
  }

  return cart;
};

const updateCart = async (
  userId: number,
  bookId: number,
  quantity: number
): Promise<Cart | any> => {
  const cart = await Cart.findOne({
    where: { userId },
  });

  if (!cart) {
    return;
  }

  CartItem.update(
    { quantity },
    {
      where: { cart_id: cart.dataValues.id, bookId },
    }
  );

  return cart;
};

const removeFromCart = async (
  userId: number,
  bookId: number
): Promise<Book | any> => {
  const cart = await Cart.findOne({
    where: { userId },
  });

  if (!cart) {
    return;
  }

  const cartItem = await CartItem.findOne({
    where: { cart_id: cart.dataValues.id, book_id: bookId },
  });

  await cartItem?.destroy();

  return cartItem;
};

const clearCart = async (userId: number): Promise<Cart | any> => {
  const cart = await Cart.findOne({
    where: { userId },
  });

  if (!cart) {
    return;
  }
  // Remove all books from the cart first
  await CartItem.destroy({ where: { cart_id: cart.dataValues.id } });

  // Delete the cart
  return await getCart(userId);
};

export default {
  getCatSingleBook,
  getCartItem,
  getActiveCartById,
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
};
