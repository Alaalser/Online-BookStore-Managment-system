import Address from "../models/address.model";

const getAddressById = async (id: number, userId: number) => {
  return await Address.findOne({ where: { id, user_id: userId } });
};

export default {
  getAddressById,
};
