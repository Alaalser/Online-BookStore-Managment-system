import Address from "../models/address.model";

const getAddress = async (userId: number) => {
  return await Address.findOne({ where: { user_id: userId } });
};

const getAddressById = async (id: number, userId: number) => {
  return await Address.findOne({ where: { id, user_id: userId } });
};

const addAddress = async (
  firstName: string,
  lastName: string,
  countryCode: string,
  mobile: string,
  location: string,
  userId: number
) => {
  return await Address.create({
    first_name: firstName,
    last_name: lastName,
    country_code: countryCode,
    user_id: userId,
    location,
    mobile,
  });
};

export default {
  getAddress,
  getAddressById,
  addAddress,
};
