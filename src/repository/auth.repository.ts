import User from "../models/user.model";

const findUserById = async (id: number): Promise<User | null> => {
  const user = await User.findByPk(id);
  return user;
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const newUser = await User.create({ name, email, password });
  return newUser;
};

export default { findUserById, findUserByEmail, createUser };
