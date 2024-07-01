import { orderRepository } from "../repository";

const createOrder = async (
  email: string,
  status: number,
  transactionId: number,
  userId: number,
  cartId: number,
  addressId: number
) => {
  return await orderRepository.createOrder(
    email,
    status,
    transactionId,
    userId,
    cartId,
    addressId
  );
};

const getOrdersByUserId = async (userId: number) => {
  return await orderRepository.getOrderByUserId(userId);
};

const getOrderById = async (id: number, userId: number) => {
  return await orderRepository.getOrderById(id as any, userId as any);
};

const getOrders = async () => {
  return await orderRepository.getOrders();
};

export default {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  getOrders,
};
