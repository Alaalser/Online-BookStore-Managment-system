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
    where: {
      user_id: userId,
      cart_id: cartId,
      address_id: addressId,
    },
    include: [{ email, status, transaction_Id: transactionId }],
  });

  return order;
};

const getOrderByUserId = async (userId: number) => {
  return await Order.findAll({ where: { user_id: userId } });
};

const getOrderById = async (id: string, userId: string) =>
  await Order.findOne({
    where: { id, user_id: userId },
  });

export default {
  createOrder,
  getOrderById,
  getOrderByUserId,
};
