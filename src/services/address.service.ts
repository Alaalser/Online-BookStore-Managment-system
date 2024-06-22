import { addressRepository } from "../repository";

const getAddress = (userId: number) => {
  return addressRepository.getAddress(userId);
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
