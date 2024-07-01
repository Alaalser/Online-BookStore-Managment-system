import Order from "../models/order.model";

const createOrder = async (
  email: string,
  status: number,
  transactionId: number,
  cartId: number,
  userId: number,
  addressId: number
) => {
  const order = await Order.create({
    email,
    status,
    transaction_id: transactionId,
    user_id: userId, // Explicitly set user_id
    cart_id: cartId, // Explicitly set cart_id
    address_id: addressId,
  });

  return order;
};

const getOrderByUserId = async (userId: number) => {
  const orders = await Order.findAll({ where: { user_id: userId } });
  return orders;
};

const getOrders = async () => {
  return await Order.findAll();
};

const getOrderById = async (id: string, userId: string) =>
  await Order.findOne({
    where: { id, user_id: userId },
  });

export default {
  createOrder,
  getOrderById,
  getOrderByUserId,
  getOrders,
};
