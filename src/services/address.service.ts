import { addressRepository } from "../repository";

const getAddress = async (userId: number) => {
  const address = await addressRepository.getAddress(userId);
  return address?.dataValues;
};

const addAddress = async (
  firstName: string,
  lastName: string,
  countryCode: string,
  mobile: string,
  location: string,
  userId: number
): Promise<any> => {
  return await addressRepository.addAddress(
    firstName,
    lastName,
    countryCode,
    mobile,
    location,
    userId
  );
};

export default {
  addAddress,
  getAddress,
};
